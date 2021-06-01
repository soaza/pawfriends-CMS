import { BlockOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import * as React from "react";
import DefaultLayout from "../../components/DefaultLayout";

const { Title } = Typography;

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <Row>
        <Col span={8}>
          <BlockOutlined style={{ fontSize: "400px", color: "lightblue" }} />
        </Col>
        <Col span={14}>
          <Title>Welcome to the Pawfriends Dashboard </Title>
          <p>Click on any of the tabs on the left to edit the page</p>
          <p>
            If you need any help or wanna provide suggestions to the
            website,drop an email to{" "}
            <a href="mailto:chukimguan@gmail.com"> chukimguan@gmail.com</a> or
            tele me at @brockchu.
          </p>
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default HomePage;
