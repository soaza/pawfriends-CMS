import * as React from "react";
import { Form, Input, Button, Card, Row, Col, Typography, message } from "antd";
import { getUser } from "../../common/api";
import { useHistory } from "react-router-dom";

const { Title } = Typography;
const { useState } = React;

interface IProps {
  setUserAuthenticated: (authenticated: boolean) => void;
}

const LoginPage: React.FC<IProps> = (props) => {
  const { setUserAuthenticated } = props;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();

  const submitLoginForm = async () => {
    try {
      const response = await getUser({
        username: username,
        password: password,
      });
      if (response) {
        localStorage.setItem("userLoggedIn", "true");
        message.success("Successfully logged in!");
        setUserAuthenticated(true);
        history.push("/home");
      } else {
        message.error("Wrong login details.");
      }
    } catch {
      message.error("Error connecting to server.");
    }
  };

  return (
    <Row justify="center">
      <Col span={14}>
        <Card hoverable style={{ height: "400px", marginTop: "100px" }}>
          <Title style={{ textAlign: "center", marginBottom: "50px" }}>
            Login
          </Title>
          <Form name="basic" initialValues={{ remember: true }}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input onChange={(text) => setUsername(text.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                onChange={(text) => setPassword(text.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Row justify="center">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    submitLoginForm();
                  }}
                >
                  Submit
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
