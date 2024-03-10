// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract GnosisStaking  {
    ERC20 public token;
    mapping(address => uint256) public stakes;
    uint256 public totalStakes;

    event Staked(address indexed staker, uint256 amount);
    event Withdrawn(address indexed staker, uint256 amount);

    constructor(address _tokenAddress) {
        token = ERC20(_tokenAddress);
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        require(token.balanceOf(msg.sender) >= _amount, "Insufficient balance");
        require(token.allowance(msg.sender, address(this)) >= _amount, "Insufficient allowance");

        token.transferFrom(msg.sender, address(this), _amount);
        stakes[msg.sender] += _amount;
        totalStakes += _amount;

        emit Staked(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        require(stakes[msg.sender] >= _amount, "Insufficient stake");

        stakes[msg.sender] -= _amount;
        totalStakes -= _amount;
        token.transfer(msg.sender, _amount);

        emit Withdrawn(msg.sender, _amount);
    }

    function getStakeOf(address _staker) external view returns (uint256) {
        return stakes[_staker];
    }

    function getTotalStakes() external view returns (uint256) {
        return totalStakes;
    }
}
