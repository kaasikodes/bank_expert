import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Modal, Radio, Select } from "antd";
import { Button } from "antd";
import { CrownIcon } from "~~/components/assets/CrownIcon";
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
export const AddWalletModal: React.FC<TProps> = ({ open, onClose, onSubmit }) => {
  const [form] = Form.useForm<TAddWalletSubmitData>();
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
      footer={
        <div className="flex gap-4 justify-end">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            onClick={() => form.submit()}
            style={{ background: "#5E5ADB" }}
            loading={onSubmit?.isLoading}
          >
            Add Wallet
          </Button>
        </div>
      }
    >
      <Form form={form} labelCol={{ span: 24 }} requiredMark={false} onFinish={onSubmit?.fn}>
        <Form.Item
          label="Wallet ERC20 address * "
          name={EAddWalletFormItemName.address}
          rules={[
            { required: true, message: "Please input your Wallet ERC20 address!" },
            { whitespace: true, message: "Wallet address cannot be empty!" },
            // TODO: Add address validator
            // TODO: Move validation to utils for reusability
          ]}
        >
          <Input placeholder="New Wallet Address" />
        </Form.Item>
        <Form.Item name={EAddWalletFormItemName.accessToWallet} label="Access to the wallet">
          <Radio.Group
            options={[
              { label: "Ask every time", value: "Ask every time" },
              { label: "Delegated", value: "Delegated" },
              { label: "Full Access", value: "Full Access" },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item name={EAddWalletFormItemName.isMasterWallet}>
          <div className="flex gap-2 items-center">
            <CrownIcon /> <Checkbox.Group options={["Make Master Wallet"]} />
          </div>
        </Form.Item>
        <Form.Item name={EAddWalletFormItemName.categoryId} label="Category">
          <Select
            placeholder={`Select Wallet Category`}
            options={["All", "Category 1"].map(item => ({ label: item, value: item }))}
          />
        </Form.Item>
        <Form.Item
          label="Name"
          name={EAddWalletFormItemName.name}
          rules={[
            { required: true, message: "Please input a Wallet name!" },
            { whitespace: true, message: "Wallet cannot be empty!" },
          ]}
        >
          <Input placeholder="Wallet Name" />
        </Form.Item>
      </Form>
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
