import React from "react";
import { AddWalletBtn } from "./AddWallet";
import { Checkbox } from "antd";

const WalletHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <AddWalletBtn onSubmit={{ fn: data => console.log("I ws clicked", data) }} />
      <Checkbox.Group
        options={[
          {
            label: "hide empty wallets",
            value: "hide empty wallets",
          },
          {
            label: "hide small balances",
            value: "hide small balances",
          },
          {
            label: "hide unsupported tokens",
            value: "hide unsupported tokens",
          },
        ]}
      />
    </div>
  );
};

export default WalletHeader;
