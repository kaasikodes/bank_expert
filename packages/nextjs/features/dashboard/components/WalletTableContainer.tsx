import React from "react";
import { DEFAULT_WALLET_CHAINS, DUMMY_WALLET_CHAIN_DATA } from "../constants";
import { TWalletChainData } from "../types";
import WalletActions from "./WalletActions";
import WalletTable from "./WalletTable";
import { CalendarOutlined } from "@ant-design/icons";
import { Avatar, Tag } from "antd";
import moment from "moment";
import { CrownIcon } from "~~/components/assets/CrownIcon";
import { LinkIcon } from "~~/components/assets/LinkIcon";
import { NoteIcon } from "~~/components/assets/NoteIcon";
import { TetherIcon } from "~~/components/assets/TetherIcon";
import { truncateString } from "~~/utils";

// TODO : THIS WILL BE GOTTEN FROM A HOOK
const activeWalletAddress = DUMMY_WALLET_CHAIN_DATA[0].address;

const WalletTableContainer = () => {
  return (
    <WalletTable
      data={DUMMY_WALLET_CHAIN_DATA}
      columns={[
        {
          key: "Name",

          title: (
            <div className="flex gap-2">
              <span>Name</span>
            </div>
          ),
          // defaultSortOrder: "descend",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (_, record) => (
            <Tag>
              <span>{record.name}</span>
            </Tag>
          ),
        },
        {
          key: "Wallet",
          // ellipsis: true,

          title: (
            <div className="flex gap-2 uppercase">
              <span>WALLET</span>
            </div>
          ),
          render: (_, record) => (
            <div className="flex gap-2 uppercase items-center">
              <Avatar src="" size="small" shape="square" />
              {record.address === activeWalletAddress ? <CrownIcon /> : null}
              <span>{truncateString(record.address, 8)}</span>
              <LinkIcon />
            </div>
          ),
        },
        ...DEFAULT_WALLET_CHAINS.map(item => ({
          key: item.key,
          title: (
            <div className="flex gap-2 uppercase items-center">
              <span>{item.icon}</span>
              <span className="uppercase" style={{ textTransform: "uppercase" }}>
                {item.key}
              </span>
            </div>
          ),
          render: (_: unknown, record: TWalletChainData) => <span>{record.chains[item.key]}</span>,
        })),
        {
          key: "Total",

          title: (
            <div className="flex gap-2 uppercase items-center">
              <span>
                <TetherIcon />
              </span>
              <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>Total</span>
            </div>
          ),
          render: (_, record) => <span className="font-bold text-gray-500">{record.total} $</span>,
        },
        {
          key: "Messages",

          title: (
            <div className="flex gap-2 uppercase items-center">
              <span>Messages</span>
            </div>
          ),
          render: (_, record) => (
            <div className="flex gap-2 uppercase items-center">
              <NoteIcon />

              <span>{record.message.total}</span>
              <Avatar.Group maxCount={2}>
                {record.message.chains.map(item => (
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
          ),
        },
        {
          key: "TX",
          title: (
            <div className="flex gap-2 uppercase">
              <span>TX</span>
            </div>
          ),
          render: (_, record) => <span>{record.transactionCount}</span>,
        },
        {
          key: "Last Activity",
          ellipsis: false,
          width: 200,
          title: (
            <div className="flex gap-2 uppercase">
              <span>Last Activity</span>
            </div>
          ),
          defaultSortOrder: "descend",
          sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
          render: (_, record) => (
            <div className="flex gap-2 items-center">
              <CalendarOutlined rev={{}} className="text-sm" />
              <span>{moment(record.createdAt).format("DD MMM YYYY, hh:mm A")}</span>
            </div>
          ),
        },
        {
          key: "___",
          render: (_, record) => (
            <>
              <WalletActions address={record.address} />
            </>
          ),
        },
      ]}
    />
  );
};

export default WalletTableContainer;
