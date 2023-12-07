// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import { Wallet } from "./Wallet.sol";

contract WalletFactory {
	address payable[] public deployWallets;

	// TODO: Create a mapping between owner and deployed wallets

	function createWallet(
		address _router,
		address _link,
		address _owner
	) public {
		// TODO: use the proper initial values are address _router, address _link
		// e.g : const routerSepolia = "0xD0daae2231E9CB96b94C8512223533293C3693Bf"; const feeLink = "0x779877A7B0D9E8603169DdbD7836e478b4624789";=> args: [routerSepolia, feeLink],

		address newWallet = address(new Wallet(_router, _link, _owner));
		deployWallets.push(payable(newWallet));
		// TODO: Create wallet should return the new wallet address
	}

	function getDeployedWallets()
		public
		view
		returns (address payable[] memory)
	{
		return deployWallets;
	}
}
