// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DualInvestment {
    AggregatorV3Interface internal dataFeed;
    int public currentEthPrice;

    constructor() {
        dataFeed = AggregatorV3Interface(
            0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e
        );
    }

    function getLatestPrice() public view returns (int) {
        (, int currentEthPrice, , , ) = dataFeed.latestRoundData();
        return answer;
    }
}
