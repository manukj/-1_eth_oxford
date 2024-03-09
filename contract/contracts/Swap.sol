// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PancakeSwapInteraction {
    address public immutable pancakeSwapRouter;
    address public immutable wbnb;
    address public constant busdToken = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56; // BUSD Token address

    constructor(address _pancakeSwapRouter, address _wbnb) {
        pancakeSwapRouter = _pancakeSwapRouter;
        wbnb = _wbnb;
    }

    function swapBusdToBnb(uint256 _amountIn, uint256 _amountOutMin, address _to, uint256 _deadline) external {
        require(_amountIn > 0, "BUSD amount must be greater than 0");

        IERC20(busdToken).transferFrom(msg.sender, address(this), _amountIn);

        address[] memory path = new address[](2);
        path[0] = busdToken;
        path[1] = wbnb;

        IERC20(busdToken).approve(pancakeSwapRouter, _amountIn);
        
        IUniswapV2Router02(pancakeSwapRouter).swapExactTokensForETH(
            _amountIn,
            _amountOutMin,
            path,
            _to,
            _deadline
        );
    }
}
