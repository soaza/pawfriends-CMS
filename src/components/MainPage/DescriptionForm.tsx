import { Button, Row } from "antd";
import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { useEffect, useState } = React;

interface IProps {
  description: string;
}
const DescriptionForm: React.FC<IProps> = (props) => {
  const { description } = props;
  console.log(description);

  const [editedDescription, setEditedDescription] = useState<string>();

  return (
    <>
      <Row>
        <ReactQuill
          style={{ height: "200px", width: "100%" }}
          value={description}
          onChange={(text) => setEditedDescription(text)}
          theme="snow"
        />
      </Row>
      <Row justify="end" style={{ marginTop: "100px" }}>
        <Button style={{ marginRight: "20px" }}>Discard changes</Button>

        <Button type="primary">Save changes</Button>
      </Row>
    </>
  );
};

export default DescriptionForm;
