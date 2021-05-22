import * as React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  InfoCircleOutlined,
  BankOutlined,
  StarOutlined,
  UserOutlined,
  ReadOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const DefaultLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<BankOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<InfoCircleOutlined />}>
            Dog Page
          </Menu.Item>

          <Menu.Item key="3" icon={<UserOutlined />}>
            Exco Page
          </Menu.Item>
          <Menu.Item key="4" icon={<StarOutlined />}>
            Main Page
          </Menu.Item>
          <Menu.Item key="5" icon={<ReadOutlined />}>
            'What we do' Page
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default DefaultLayout;
