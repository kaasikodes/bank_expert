import WalletTableContainer from "./WalletTableContainer";
import { Avatar, Segmented, Tabs } from "antd";

const WalletTabs = () => {
  return (
    <Tabs
      tabBarExtraContent={<Segmented options={["All", "Sepolia", "Goerli", "Mumbai", "Fuji", "BNB"]} />}
      items={[
        {
          key: "All",
          label: <TabLabel amount={10} title={"All"} />,
          children: <WalletTableContainer />,
        },
        {
          key: "Cold",
          label: <TabLabel amount={10} title={"Cold"} />,
        },
      ]}
    />
  );
};

const TabLabel: React.FC<{ title: string; amount: number }> = ({ title, amount }) => {
  return (
    <div className="flex gap-2 items-center">
      <span>{title}</span>
      <Avatar icon={`${amount}`} size={15} shape="circle" />
    </div>
  );
};

export default WalletTabs;
