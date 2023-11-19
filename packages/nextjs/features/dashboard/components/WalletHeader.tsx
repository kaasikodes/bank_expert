import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";

const WalletHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <Button icon={<PlusOutlined rev={{}} />} type="primary" style={{ background: "#5E5ADB" }} size="small">
        Add Wallet
      </Button>
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
