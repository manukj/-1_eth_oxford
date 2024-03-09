// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DualInvestment {
    address public usdcTokenAddress;
    address public ethTokenAddress;
    address public priceETHUSDAddress =
        0x694AA1769357215DE4FAC081bf1f309aDC325306;
    AggregatorV3Interface internal priceFeed;

    struct Order {
        address user;
        uint256 ethAmount;
        uint256 ethPriceAtOrder;
        uint256 margin; // Percentage gain desired
        uint256 timestamp;
        bool executed;
    }

    mapping(address => Order) public orders;

    constructor(address _usdcTokenAddress, address _ethTokenAddress) {
        usdcTokenAddress = _usdcTokenAddress;
        ethTokenAddress = _ethTokenAddress;
        priceFeed = AggregatorV3Interface(priceETHUSDAddress);
    }

    function getLatestPrice() public view returns (int) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    function placeOrderToSellEthLow(uint256 _amount, uint256 _margin) public {
        int ethPrice = getLatestPrice();
        uint256 ethAmount = _amount / uint256(ethPrice);
        IERC20(ethTokenAddress).transferFrom(
            msg.sender,
            address(this),
            ethAmount
        );

        orders[msg.sender] = Order(
            msg.sender,
            ethAmount,
            uint256(ethPrice),
            _margin,
            block.timestamp,
            false
        );
    }

    function executeOrder(address _user) public {
        Order storage order = orders[_user];
        require(order.user != address(0), "Order does not exist");
        require(!order.executed, "Order already executed");

        // Check if the current ETH price has reached the desired margin
        uint256 currentEthInUSDPrice = uint256(getLatestPrice());
        uint256 currentUsdcAmount = currentEthInUSDPrice * order.ethAmount;
        uint256 originalUsdcAmount = order.ethPriceAtOrder * order.ethAmount;
        uint256 gain = (currentUsdcAmount * 100) / originalUsdcAmount;

        if (
            gain >= order.margin || block.timestamp >= order.timestamp + 6 days
        ) {
            // Margin reached or 6 days passed, execute order
            uint256 marginUsdcAmount = (originalUsdcAmount * order.margin) / 100;
            uint256 remainingUsdcAmount = currentUsdcAmount - marginUsdcAmount;
            IERC20(usdcTokenAddress).transfer(order.user, marginUsdcAmount);
            order.executed = true;
            if (remainingUsdcAmount > 0) {
                IERC20(usdcTokenAddress).transfer(address(this), remainingUsdcAmount);
            }
        } else {
            // Return a fraction of ETH to the user
            uint256 refundEthAmount = order.ethAmount + order.ethAmount / 100; // 1% of the initial ETH amount
            IERC20(ethTokenAddress).transfer(order.user, refundEthAmount);
            order.executed = true;
        }
    }

    function recieveUSDC(uint256 _amount) public {
        IERC20(usdcTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
    }

    function recieveETH(uint256 _amount) public {
        IERC20(ethTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
    }
}
