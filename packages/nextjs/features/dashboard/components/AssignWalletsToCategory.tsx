"use client";

import React, { useState } from "react";
import { Form, Modal, Select } from "antd";
import { Button } from "antd";
import { useSession } from "next-auth/react";
import { useQueryClient } from "react-query";
import {
  QUERY_KEY_FOR_WALLET_CATEGORIES,
  useGetWalletCategories,
} from "~~/hooks/wallet/category/useGetWalletCategories";
import { useAssignWalletsACategory } from "~~/hooks/wallet/useAssignWalletsACategory";
import { TModalProps } from "~~/types/general";

enum EAddCategoryFormItemName {
  categoryId = "categoryId",
}
type TAddCategorySubmitData = {
  [EAddCategoryFormItemName.categoryId]: string;
};
type AddCategoryProps = {
  onSubmit: { fn: (data: TAddCategorySubmitData) => void; isLoading?: boolean };
};
type TProps = TModalProps & AddCategoryProps;
export const AssignWalletsToCategoryModal: React.FC<TProps> = ({ open, onClose, onSubmit }) => {
  const [form] = Form.useForm<TAddCategorySubmitData>();
  const handleSubmit = (data: TAddCategorySubmitData) => {
    onSubmit.fn({ categoryId: data[EAddCategoryFormItemName.categoryId] });
  };
  const { data: categoryData, isLoading: isLoadingCategories } = useGetWalletCategories();

  return (
    <Modal
      title="Add Wallets to Category"
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
            Assign
          </Button>
        </div>
      }
    >
      <Form form={form} labelCol={{ span: 24 }} requiredMark={false} onFinish={handleSubmit}>
        <Form.Item
          label="Select Category"
          name={EAddCategoryFormItemName.categoryId}
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            loading={isLoadingCategories}
            placeholder="Category"
            options={categoryData?.data?.map(item => ({ label: item.name, value: item.id }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const AssignWalletsToCategoryBtn: React.FC<{ addresses: string[]; clearSelectedWallets: () => void }> = ({
  addresses,
  clearSelectedWallets,
}) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { mutate, isLoading } = useAssignWalletsACategory();
  const handleSubmit = ({ categoryId }: { categoryId: string }) => {
    if (!session) return;
    mutate(
      {
        categoryId,
        addresses,
        userId: session?.user.id,
      },
      {
        // onError: () => {},
        onSuccess: () => {
          clearSelectedWallets();
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_WALLET_CATEGORIES],
            // exact: true,
          });
        },
      },
    );
  };
  if (addresses.length === 0) return null;
  return (
    <>
      <AssignWalletsToCategoryModal
        onSubmit={{ fn: handleSubmit, isLoading }}
        open={open}
        onClose={() => setOpen(false)}
      />
      <Button size="small" onClick={() => setOpen(true)}>
        Assign Category
      </Button>
    </>
  );
};
