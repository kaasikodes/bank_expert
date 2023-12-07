import { useState } from "react";
import { useGetDeployedWallets } from "./WalletDetails";
import WalletTableContainer from "./WalletTableContainer";
import { Avatar, Segmented, Tabs } from "antd";
import { useGetWalletCategories } from "~~/hooks/wallet/category/useGetWalletCategories";

const WalletTabs = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>("CCIP-BnM");
  const { result: deployedWallets, isFetching: isFetchingDeployedWallets } = useGetDeployedWallets();

  const { data: categories, isLoading } = useGetWalletCategories();
  return (
    <Tabs
      tabBarExtraContent={
        <Segmented
          onChange={val => setSelectedCoin(val as unknown as string)}
          options={["CCIP-BnM", "CCIP-LnM", "Link"]}
        />
      }
      items={[
        {
          key: "All",
          label: <TabLabel amount={deployedWallets?.length} title={"All"} />,
          children: (
            <WalletTableContainer
              selectedCrossChainCoin={selectedCoin}
              addresses={deployedWallets}
              isLoading={isFetchingDeployedWallets}
            />
          ),
        },
        ...(categories?.data ?? []).map(category => ({
          key: category.name,
          label: <TabLabel amount={category?.wallets?.length} title={category.name} />,
          children: (
            <WalletTableContainer
              selectedCrossChainCoin={selectedCoin}
              isLoading={isLoading}
              addresses={category.wallets.map(item => item.address)}
            />
          ),
        })),
      ]}
    />
  );
};

const TabLabel: React.FC<{ title: string; amount?: number }> = ({ title, amount }) => {
  return (
    <div className="flex gap-2 items-center">
      <span>{title}</span>
      <Avatar icon={`${amount}`} size={20} shape="circle" />
    </div>
  );
};

export default WalletTabs;
