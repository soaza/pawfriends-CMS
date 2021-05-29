import * as React from "react";
import { Col, DatePicker, Drawer, Form, Input, Row, Select } from "antd";

const { useState } = React;

interface IProps {
  setShowDrawer: (showDrawer: boolean) => void;
  showDrawer: boolean;
}
const EditDrawer: React.FC<IProps> = (props) => {
  const { showDrawer, setShowDrawer } = props;

  const [visible, setVisible] = useState(showDrawer);

  return (
    <Drawer
      width={720}
      title="Edit Information"
      placement="right"
      onClose={() => {
        setShowDrawer(false);
        setVisible(false);
      }}
      visible={visible}
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}></Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}></Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "please enter url description",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="please enter url description"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default EditDrawer;
