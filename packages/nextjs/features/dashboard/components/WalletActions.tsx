import { useState } from "react";
import { TWalletChainData } from "../types";
import WalletDetails from "./WalletDetails";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";

type TAction = "view" | "edit" | "delete";
const WalletActions: React.FC<{ address: string; data?: TWalletChainData }> = ({ address, data }) => {
  const [action, setAction] = useState<TAction>();
  const onClose = () => {
    setAction(undefined);
  };
  return (
    <>
      <WalletDetails open={action === "view"} onClose={onClose} address={address} data={data} />
      <Dropdown
        menu={{
          items: [
            {
              onClick: () => setAction("view"),
              label: "View",
              key: "View",
            },
            {
              label: "Edit",
              key: "Edit",
            },
            {
              className: "text-red-400",
              label: "Delete",
              key: "Delete",
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button icon={<MoreOutlined rev={{}} />} type="text" size="small" />
      </Dropdown>
    </>
  );
};

export default WalletActions;
