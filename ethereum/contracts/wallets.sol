// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WalletFactory {
    address payable[] public deployWallets;

    function createWallet() public {
        address newWallet = address(new Wallet(msg.sender));
        deployWallets.push(payable(newWallet));
    }

    function getDeployedWallets() public view returns (address payable[] memory) {
        return deployWallets;
    }
}

contract Wallet {
    struct Chain {
        string description;
        uint price;
        address contractAddress;
    }

    Chain[] public chains;
    address public masterwallet;
    mapping(address => bool) public owners;

    modifier restricted() {
        require(msg.sender == masterwallet);
        _;
    }

    constructor(address creator) {
        masterwallet = creator;
        owners[creator] = true;
    }

    function addChain(string memory description, uint price, address newprotocol) public restricted {
        require(msg.sender == masterwallet);
        Chain memory newChain = Chain({
            description: description,
            price: price,
            contractAddress: newprotocol
        });
        chains.push(newChain);
    }

    function getSummary() public view returns (
        uint,
        uint,
        address
    ) {
        return (
            address(this).balance,
            chains.length,
            masterwallet
        );
    }

    function getWalletCount() public view returns (uint) {
        return chains.length;
    }
}