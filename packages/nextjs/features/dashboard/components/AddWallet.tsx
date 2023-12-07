import React, { useState } from "react";
import { AddWalletTabs } from "./AddWalletTabs";
import { PlusOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Button } from "antd";
import { TModalProps } from "~~/types/general";

enum EAddWalletFormItemName {
  address = "address",
  accessToWallet = "accessToWallet",
  isMasterWallet = "isMasterWallet",
  categoryId = "categoryId",
  name = "name",
}
type TAddWalletSubmitData = {
  [EAddWalletFormItemName.address]: string;
  [EAddWalletFormItemName.accessToWallet]: "ask" | "delegated" | "full-access";
  [EAddWalletFormItemName.isMasterWallet]?: boolean;
  [EAddWalletFormItemName.categoryId]: string;
  [EAddWalletFormItemName.name]: string;
};
type AddWalletProps = {
  onSubmit: { fn: (data: TAddWalletSubmitData) => void; isLoading?: boolean };
};
type TProps = TModalProps & AddWalletProps;
export const AddWalletModal: React.FC<TProps> = ({ open, onClose }) => {
  return (
    <Modal
      title="Add New Wallet"
      style={{ top: 20 }}
      open={open}
      onCancel={onClose}
      classNames={{
        header: "shadow-sm",
        body: "shadow-sm",
      }}
      styles={{
        header: {
          paddingBottom: "10px",
          padding: "10px 24px 10px 24px",
        },
        footer: {
          padding: "10px 24px 10px 24px",
        },
        body: {
          padding: "10px 24px 24px 24px",
          background: "#F7F9FC",
          margin: 0,
        },
        content: {
          padding: 0,
        },
      }}
      footer={null}
    >
      <AddWalletTabs onClose={onClose} />
    </Modal>
  );
};

export const AddWalletBtn: React.FC<AddWalletProps> = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AddWalletModal onSubmit={onSubmit} open={open} onClose={() => setOpen(false)} />
      <Button
        icon={<PlusOutlined rev={{}} />}
        type="primary"
        style={{ background: "#5E5ADB" }}
        size="small"
        onClick={() => setOpen(true)}
      >
        Add Wallet
      </Button>
    </>
  );
};
