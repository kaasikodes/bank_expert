"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BellFilled, LogoutOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { MenuProps } from "antd";
import { Avatar, Badge, Layout, Menu, Tag, Typography } from "antd";
import { signOut, useSession } from "next-auth/react";
import { BankExpertLogo } from "~~/components/assets/BankExpertLogo";
import { MetaMaskLogo } from "~~/components/assets/MetaMaskLogo";
import { SettingsIcon } from "~~/components/assets/SettingsIcon";

const { Header, Content, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    className: "self-center py-8 margin-auto",
    key: "Home",
    icon: <BankExpertLogo />,
    // label: `Home`,
  },
  {
    className: "self-center py-8 margin-auto",
    key: "Metamask",
    icon: <MetaMaskLogo />,
    // label: `Home`,
  },
  {
    className: "self-center py-8 margin-auto",
    key: "Settings",
    icon: <SettingsIcon />,
    // label: `Home`,
  },
];

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const handleLogout = () => {
    signOut();
  };
  const { push } = useRouter();
  useEffect(() => {
    if (!!session === false) {
      push("/auth/login");
    }
  }, [push, session]);
  return (
    <Layout
      hasSider
      style={{
        background: "#fff",
      }}
    >
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={80}
      >
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={["Home__"]} items={items} />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 80, background: "#fff" }}>
        <Header style={{ padding: 16, background: "#F7F9FC" }}>
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <Typography.Title level={3}>
                <span className="font-bold">BankXpert</span>
              </Typography.Title>
              <Tag color="#EDEDFC" className="rounded-full mb-2">
                <span className="text-[#5E5ADB]" style={{ color: "#5E5ADB" }}>
                  {" "}
                  wallet hub
                </span>
              </Tag>
            </div>
            <div className="flex gap-6 items-center" style={{ gap: "1 rem" }}>
              <ConnectButton />
              <Badge dot>
                <BellFilled rev={{}} className="text-xl text-gray-500" />
              </Badge>
              <QuestionCircleOutlined rev={{}} className="text-xl text-gray-500" />
              <Avatar src={session?.user.image} />
              <LogoutOutlined rev={{}} className="text-xl text-gray-500" onClick={handleLogout} />
            </div>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>{children}</Content>
        {/* <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
