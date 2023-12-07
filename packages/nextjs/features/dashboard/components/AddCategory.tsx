"use client";

import React, { useState } from "react";
import { Form, Input, Modal } from "antd";
import { Button } from "antd";
import { useSession } from "next-auth/react";
import { useQueryClient } from "react-query";
import { useAddWalletCategory } from "~~/hooks/wallet/category/useAddWalletCategory";
import { QUERY_KEY_FOR_WALLET_CATEGORIES } from "~~/hooks/wallet/category/useGetWalletCategories";
import { TModalProps } from "~~/types/general";

enum EAddCategoryFormItemName {
  name = "name",
}
type TAddCategorySubmitData = {
  [EAddCategoryFormItemName.name]: string;
};
type AddCategoryProps = {
  onSubmit: { fn: (data: TAddCategorySubmitData) => void; isLoading?: boolean };
};
type TProps = TModalProps & AddCategoryProps;
export const AddCategoryModal: React.FC<TProps> = ({ open, onClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<TAddCategorySubmitData>();
  const { data: session } = useSession();
  const { mutate, isLoading } = useAddWalletCategory();
  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
        userId: session?.user.id ?? "",
      },
      {
        // onError: () => {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_WALLET_CATEGORIES],
            // exact: true,
          });
        },
      },
    );
  };

  return (
    <Modal
      title="Add New Category"
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
          <Button type="primary" onClick={() => form.submit()} style={{ background: "#5E5ADB" }} loading={isLoading}>
            Add Category
          </Button>
        </div>
      }
    >
      <Form form={form} labelCol={{ span: 24 }} requiredMark={false} onFinish={handleSubmit}>
        <Form.Item
          label="Wallet Category Name"
          name={EAddCategoryFormItemName.name}
          rules={[
            { required: true, message: "Please input category name!" },
            { whitespace: true, message: "Wallet Category name cannot be empty!" },
            // TODO: Add address validator
            // TODO: Move validation to utils for reusability
          ]}
        >
          <Input placeholder="New Wallet Address" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const AddCategoryBtn: React.FC<AddCategoryProps> = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AddCategoryModal onSubmit={onSubmit} open={open} onClose={() => setOpen(false)} />
      <Button type="text" size="small" onClick={() => setOpen(true)}>
        Add Category
      </Button>
    </>
  );
};
