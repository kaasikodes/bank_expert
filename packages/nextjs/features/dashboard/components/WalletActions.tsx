import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";

const WalletActions: React.FC<{ address: string }> = ({ address }) => {
  return (
    <>
      <Dropdown
        menu={{
          items: [
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
