import React from "react";
import { type TWalletChainData } from "../types";
import { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Table from "~~/components/ui/table";

const WalletTable: React.FC<{
  data?: TWalletChainData[];
  columns?: ColumnsType<TWalletChainData>;
  rowSelection?: TableRowSelection<TWalletChainData>;
}> = ({ data, columns, rowSelection }) => {
  return (
    <Table
      dataSource={data}
      columns={columns}
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      // size="small"
      scroll={{ x: "max-content" }}
    />
  );
};

export default WalletTable;
