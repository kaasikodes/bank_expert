// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {Wallet} from "./wallets.sol";

contract WalletFactory {
    address payable[] public deployWallets;

    function createWallet() public {
        address newWallet = address(new Wallet(msg.sender));
        deployWallets.push(payable(newWallet));
    }

    function getDeployedWallets()
        public
        view
        returns (address payable[] memory)
    {
        return deployWallets;
    }
}
