import React, { useState } from "react";
import { DEFAULT_WALLET_CHAINS } from "../constants";
import { TWalletChainData } from "../types";
import { SendCoins } from "./SendCoins";
import { SendMessage } from "./SendMessage";
import { Avatar, Form, Input, Modal, Segmented, Select, Typography } from "antd";
import moment from "moment";
import { TModalProps } from "~~/types/general";

type TWalletDetailProps = { address: string; data?: TWalletChainData };
type TProps = TModalProps & TWalletDetailProps;
const WalletDetails: React.FC<TProps> = ({ onClose, open, address, data }) => {
  return (
    <Modal
      title="Wallet Details"
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
          padding: "5px 24px 0px 24px",
          marginBottom: 0,
          marginTop: 0,
        },
        body: {
          padding: "32px 24px 32px 24px",
          background: "#F7F9FC",
          margin: 0,
        },
        content: {
          padding: 0,
        },
      }}
      footer={<WalletDetailActionForm />}
    >
      <WalletInsights address={address} data={data} />
    </Modal>
  );
};
const WalletInsights: React.FC<TWalletDetailProps> = ({ address, data }) => {
  return (
    <div className="flex flex-col gap-6">
      <Input value={address} />
      <div className="px-4 py-4  border-black border flex gap-6">
        <Avatar src="" size={80} />
        <div className="flex flex-col gap-4">
          <Typography.Title level={5}>
            <span className="font-semibold">{data?.name}</span>
          </Typography.Title>
          <div className="flex gap-2 items-center">
            <span className="font-semibold">Total now in USD: ${data?.total}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-normal">
              Max-transaction: 46 Eth (${data?.transactionCount}) at {moment(data?.createdAt).format("h:mm:ss A")}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-normal">Has Active in Blockchains:</span>
            <Avatar.Group maxCount={5}>
              {data?.message.chains.map(item => (
                <Avatar
                  key={item}
                  size="small"
                  icon={<div className="mt-1">{DEFAULT_WALLET_CHAINS.find(chain => chain.key === item)?.icon}</div>}
                  className="items-center justify-center"
                  style={{ backgroundColor: "#fff" }}
                />
              ))}
            </Avatar.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

const WalletDetailActionForm = () => {
  const [action, setAction] = useState<"Send Coins" | "Send Message">();
  const [form] = Form.useForm<{ chain: string; action: string }>();
  const [selectedChain, setSelectedChain] = useState<string>(DEFAULT_WALLET_CHAINS[0].key);
  return (
    <>
      <SendCoins
        selectedChain={selectedChain}
        open={action === "Send Coins"}
        onClose={() => setAction(undefined)}
        onSubmit={{ fn: () => setAction(undefined) }}
      />
      <SendMessage
        selectedChain={selectedChain}
        open={action === "Send Message"}
        onClose={() => setAction(undefined)}
        onSubmit={{ fn: () => setAction(undefined) }}
      />
      <Form
        form={form}
        onFinish={values => {
          console.log(values, ".......");
        }}
        labelCol={{ span: 24 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4"
      >
        <Form.Item label="Choose Blockchain" className="lg:col-span-1">
          <Select
            placeholder="Select Chain"
            onSelect={value => setSelectedChain(value)}
            value={selectedChain}
            options={DEFAULT_WALLET_CHAINS.map(chain => ({
              value: chain.key,

              label: (
                <div className="flex gap-2 items-center">
                  <span>{chain.icon}</span>
                  <span className="capitalize">{chain.name}</span>
                </div>
              ),
            }))}
          />
        </Form.Item>
        <Form.Item label="Choose Action" className="lg:col-span-1 flex justify-end">
          <div className="flex justify-start">
            <Segmented
              onSelect={() => form.submit()}
              options={[
                {
                  label: (
                    <span className="cursor-pointer" onClick={() => setAction("Send Coins")}>
                      Send Coins
                    </span>
                  ),
                  value: "Send Coins",
                },
                {
                  label: (
                    <span className="cursor-pointer" onClick={() => setAction("Send Message")}>
                      Send Message
                    </span>
                  ),
                  value: "Send Message",
                },
              ]}
              style={{ color: "#5E5ADB" }}
            />
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export const WalletDetailsBtn: React.FC<TWalletDetailProps & { children?: React.ReactNode }> = ({
  address,
  data,
  children,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <WalletDetails address={address} data={data} open={open} onClose={() => setOpen(false)} />
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>
    </>
  );
};

export default WalletDetails;
