// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// contract DualInvestment {
//     address public usdcTokenAddress =
//         0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48; // Mainnet USDC Token Address in BSC
//     address public ethTokenAddress = 0x2170Ed0880ac9A755fd29B2688956BD959F933F8; // Mainnet ETH Token Address in BSC
//     AggregatorV3Interface internal dataFeed;
//     receive() external payable {}

//     // write a function to recieve amount of USDC which will be used to buy ETH
//     function buyEth(uint256 _amount) public {
//         // the amount of USDC will be transferred from the sender to the contract
//         IERC20(usdcTokenAddress).transferFrom(
//             msg.sender,
//             address(this),
//             _amount
//         );
//         int ethPrice = getLatestPrice();
//         uint256 ethAmount = _amount / ethPrice;
//         // require(address(this).balance >= ethAmount, "Insufficient balance in the contract");
//         // payable(msg.sender).transfer(ethAmount);
//     }

//     function placeOrder(uint256 _amount) public {
//         int ethPrice = getLatestPrice();
//         uint256 ethAmount = _amount / ethPrice;
//         // emit a event with the amount of ETH can be bought
//         // require(address(this).balance >= ethAmount, "Insufficient balance in the contract");
//         // payable(msg.sender).transfer(ethAmount);
//     }

//     constructor() {
//         dataFeed = AggregatorV3Interface(
//             0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e
//         );
//     }

//     function getLatestPrice() public view returns (int) {
//         (, int currentEthPrice, , , ) = dataFeed.latestRoundData();
//         return answer;
//     }
// }

contract DualInvestment {
    address public usdcTokenAddress;
    address public ethTokenAddress;

    constructor(address _usdcTokenAddress, address _ethTokenAddress) {
        usdcTokenAddress = _usdcTokenAddress;
        ethTokenAddress = _ethTokenAddress;
    }

    // recieve USDC token from a address and stored in the contract address
    function recieveUSDC(uint256 _amount) public {
        // the amount of USDC will be transferred from the sender to the contract
        IERC20(usdcTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
    }

    // recieve ETH token from a address and stored in the contract address
    function recieveETH(uint256 _amount) public {
        // the amount of USDC will be transferred from the sender to the contract
        IERC20(ethTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
    }

    // function to buy ETH using USDC with a date   
    function buyEth(uint256 _amount) public {
        // get the current price of ETH
        int ethPrice = getLatestPrice();
        // calculate the amount of ETH that can be bought
        uint256 ethAmount = _amount / ethPrice;
        // transfer the amount of ETH to the sender
        IERC20(ethTokenAddress).transfer(msg.sender, ethAmount);
    }
}
