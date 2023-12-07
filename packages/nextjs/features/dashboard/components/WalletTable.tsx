"use client";

import React, { useState } from "react";
import { type TWalletChainData } from "../types";
import { AssignWalletsToCategoryBtn } from "./AssignWalletsToCategory";
import { ColumnsType } from "antd/es/table";
import Table from "~~/components/ui/table";

const WalletTable: React.FC<{
  data?: TWalletChainData[];
  columns?: ColumnsType<TWalletChainData>;
  isLoading?: boolean;
}> = ({ data, columns, isLoading }) => {
  const [selectedWallets, setSelectedWallets] = useState<TWalletChainData[]>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TWalletChainData[]) => {
      setSelectedWallets(selectedRows);
    },
  };
  const clearSelectedWallets = () => setSelectedWallets([]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-4">
        <AssignWalletsToCategoryBtn
          clearSelectedWallets={clearSelectedWallets}
          addresses={selectedWallets.map(wallet => wallet.address)}
        />
      </div>
      <Table
        loading={isLoading}
        dataSource={data}
        columns={columns}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        // size="small"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default WalletTable;
