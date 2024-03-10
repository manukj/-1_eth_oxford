## **-1(minus one)**
------

-1(minus one) is a investment application built using Farcaster Frame that can be used in [WrapCast](https://warpcast.com/) 

------

## Dual-Profit


Currently we are focusing one investment Idea, Which we call as _**Dual-Profit**_

Imagine trading a coin with a certain margin. What if I told you that you could earn a profit whether the margin of the coin is reached or not?

**HOW?**

![Blank diagram](https://github.com/manukj/-1_eth_oxford/assets/22499119/b075d46b-8832-425d-b0bf-0ebfeeb8cc7d)

Let's understand the flowchart with an example of selling  ETH for USDC with a margin of 10%:

1. The user clicks on "Sell at High."
   
3. The user sets the margin at 10% and defaults to 6 days.
   
4. If the value of ETH is greater than or equal to the margin:
   
----- The user's coin is sold at that margin, and the respective coin is given.

----- Any profit earned within the network is kept within the coin itself.

5. If the value of ETH is less than or equal to the margin:
   
----- Then the user is refunded with the initial ETH and a certain percentage of the initial ETH invested.


**Same Goes with Buy At Low **

![Blank diagram-2](https://github.com/manukj/-1_eth_oxford/assets/22499119/740fef3e-f1c3-4e18-9c4d-7849377a49e5)



This way, the user profits even if the set margin is reached or not.
----------


**How does the contract give extra coin if the margin is not reached?**

Using Gnosis Chain 

![background](https://github.com/manukj/-1_eth_oxford/assets/22499119/eecf1152-c27c-41ac-8e94-ae321ca8ec3e)




Difficulties faced during building:
1. Discovered that DeFi protocols like Uniswap had to be deployed on the mainnet and couldn't be used on the testnet due to liquidity issues.
2. Pancake Swapping Protocol had to be deployed on Binance, but there were compatibility issues with other contracts.

