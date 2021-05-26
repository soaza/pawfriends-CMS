import * as React from "react";
import { Layout, Menu, message } from "antd";
import {
  InfoCircleOutlined,
  BankOutlined,
  StarOutlined,
  UserOutlined,
  ReadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

const { Sider, Content } = Layout;

const DefaultLayout: React.FC = (props) => {
  const { children } = props;
  const history = useHistory();

  // some lazy ass way to get current page
  const currentPage = window.location.href.split("/")[3]
    ? window.location.href.split("/")[3]
    : "home";

  const logUserOut = () => {
    localStorage.removeItem("userLoggedIn");
    message.success("Successfully logged out!");
    history.push("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          selectedKeys={[currentPage]}
          mode="inline"
        >
          <Menu.Item key="home" icon={<BankOutlined />}>
            Dashboard
            <Link to="/home" />
          </Menu.Item>
          <Menu.Item key="dogs" icon={<InfoCircleOutlined />}>
            Dog Page
            <Link to="/dogs" />
          </Menu.Item>

          <Menu.Item key="exco" icon={<UserOutlined />}>
            Exco Page
            <Link to="/exco" />
          </Menu.Item>
          <Menu.Item key="main" icon={<StarOutlined />}>
            Main Page
            <Link to="/main" />
          </Menu.Item>
          <Menu.Item key="activity" icon={<ReadOutlined />}>
            'What we do' Page
            <Link to="/activity" />
          </Menu.Item>

          <Menu.Item
            onClick={() => logUserOut()}
            key="logout"
            icon={<ArrowLeftOutlined />}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Content style={{ margin: "24px 16px 0" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
