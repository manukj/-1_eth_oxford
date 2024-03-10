// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {GnosisStaking} from "./GnosisStaking.sol";

contract DualInvestment {
    address public usdcTokenAddress;
    address public ethTokenAddress;
    address public priceETHUSDAddress =
        0x694AA1769357215DE4FAC081bf1f309aDC325306;
    AggregatorV3Interface internal priceFeed;
    GnosisStaking gonisisStaking;

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
        gonisisStaking = new GnosisStaking(_ethTokenAddress);
    }

    function getLatestETHPrice() public view returns (int) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    function placeOrderToSellEthLow(uint256 _amount, uint256 _margin) public {
        int ethPrice = getLatestETHPrice();
        uint256 ethAmount = _amount / uint256(ethPrice);
        IERC20(ethTokenAddress).transferFrom(
            msg.sender,
            address(this),
            ethAmount
        );

        // stake the coin in gonisis staking contract
        gonisisStaking.stake(ethAmount);

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

        //withdraw the coin from gonisis staking contract to this contract
        gonisisStaking.withdraw(order.ethAmount);

        // Check if the current ETH price has reached the desired margin
        uint256 currentEthInUSDPrice = uint256(getLatestETHPrice());
        uint256 currentUsdcAmount = currentEthInUSDPrice * order.ethAmount;
        uint256 originalUsdcAmount = order.ethPriceAtOrder * order.ethAmount;
        uint256 gain = (currentUsdcAmount * 100) / originalUsdcAmount;

        if (
            gain >= order.margin || block.timestamp >= order.timestamp + 6 days
        ) {
            // Margin reached or 6 days passed, execute order
            uint256 marginUsdcAmount = (originalUsdcAmount * order.margin) /
                100;
            uint256 remainingUsdcAmount = currentUsdcAmount - marginUsdcAmount;
            IERC20(usdcTokenAddress).transfer(order.user, marginUsdcAmount);
            order.executed = true;
            if (remainingUsdcAmount > 0) {
                IERC20(usdcTokenAddress).transfer(
                    address(this),
                    remainingUsdcAmount
                );
            }
        } else {
            // get the amount that is earned gonisis staking contract
            uint256 stakedETHAmout = gonisisStaking.getStakeOf(_user);
            // withdraw the staked amount from gonisis staking contract
            gonisisStaking.withdraw(stakedETHAmout);
            // refund the staked amount to the user and inital amount
            uint256 refundEthAmount = order.ethAmount + stakedETHAmout;
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
