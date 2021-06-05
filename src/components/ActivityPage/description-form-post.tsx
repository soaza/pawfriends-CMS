import { Button, message, Row, DatePicker } from "antd";
import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";

import {
  submitActivityPost,
  updateActivityPost,
  updateMainDescription,
} from "../../common/api";

const { useState } = React;

interface IProps {
  setReload: (reload: boolean) => void;
}

const DescriptionFormPost: React.FC<IProps> = (props) => {
  const { setReload } = props;
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formDetails, setFormDetails] = useState<IActivityPostForm>({
    date: new Date(),
    description: "",
  });

  const submitForm = async () => {
    try {
      const response = await submitActivityPost(formDetails);
      setReload(true);
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
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          style={{
            backgroundColor: "#6C64FF",
            borderColor: "#6C64FF",
            marginTop: 50,
          }}
          type="primary"
          block
        >
          New Post
        </Button>
      )}

      {showForm && (
        <>
          <Row>
            <Row style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 18, margin: 0, marginRight: 10 }}>Date: </p>
              <DatePicker
                onChange={(date) => {
                  if (date)
                    setFormDetails({
                      ...formDetails,
                      date: new Date(
                        moment(date?.toDate())
                          .utcOffset("+8")
                          .format("YYYY-MM-DD HH:mm")
                      ),
                    });
                }}
              />
            </Row>

            <ReactQuill
              style={{ height: "200px", width: "100%" }}
              onChange={(text) =>
                setFormDetails({ ...formDetails, description: text })
              }
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
                submitForm();
              }}
              type="primary"
            >
              Submit Post
            </Button>
          </Row>
        </>
      )}
    </>
  );
};

export default DescriptionFormPost;
