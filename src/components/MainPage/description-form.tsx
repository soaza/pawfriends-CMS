import { Button, message, Row } from "antd";
import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateMainDescription } from "../../common/api";

const { useState } = React;

interface IProps {
  description: string;
  setShowForm: (showForm: boolean) => void;
}
const DescriptionForm: React.FC<IProps> = (props) => {
  const { description, setShowForm } = props;
  const [editedDescription, setEditedDescription] =
    useState<string>(description);

  const submitEditedDescription = async () => {
    try {
      const response = await updateMainDescription(editedDescription);
      if (response) {
        message.success("Update successful");
      } else {
        message.error("Failed to update");
      }
    } catch {
      message.error("Failed to connect to server.");
    }
  };

  return (
    <>
      <Row>
        <ReactQuill
          style={{ height: "200px", width: "100%" }}
          value={editedDescription}
          onChange={(text) => setEditedDescription(text)}
          theme="snow"
        />
      </Row>
      <Row justify="end" style={{ marginTop: "100px" }}>
        <Button
          onClick={() => setShowForm(false)}
          style={{ marginRight: "20px" }}
        >
          Discard changes
        </Button>

        <Button
          onClick={() => {
            setShowForm(false);
            submitEditedDescription();
          }}
          type="primary"
        >
          Save changes
        </Button>
      </Row>
    </>
  );
};

export default DescriptionForm;
