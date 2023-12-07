import { useState } from "react";
import { TWalletChainData } from "../types";
import { WalletAllowListDestinationChain } from "./WalletAllowListDestinationChain";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";

type TAction = "allowlistDestinationChain";
const WalletActions: React.FC<{ address: string; data?: TWalletChainData; children?: React.ReactNode }> = ({
  address,
  children = <Button icon={<MoreOutlined rev={{}} />} type="text" size="small" />,
}) => {
  const [action, setAction] = useState<TAction>();
  const onClose = () => {
    setAction(undefined);
  };
  return (
    <>
      <WalletAllowListDestinationChain
        open={action === "allowlistDestinationChain"}
        onClose={onClose}
        contractAddress={address}
      />
      <Dropdown
        menu={{
          items: [
            {
              onClick: () => setAction("allowlistDestinationChain"),
              label: "allowlistDestinationChain",
              key: "allowlistDestinationChain",
            },
          ],
        }}
        trigger={["click"]}
      >
        {children}
      </Dropdown>
    </>
  );
};

export default WalletActions;
