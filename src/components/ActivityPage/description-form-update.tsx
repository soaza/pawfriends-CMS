import { Button, message, Row, DatePicker } from "antd";
import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateActivityPost, updateMainDescription } from "../../common/api";
import moment from "moment";

const { useState } = React;

interface IProps {
  post: IActivityPosts;
  setReload: (reload: boolean) => void;
}
const DescriptionFormUpdate: React.FC<IProps> = (props) => {
  const { post, setReload } = props;
  const [editedPost, setEditedPost] = useState<IActivityPosts>(post);
  const [showForm, setShowForm] = useState<boolean>(false);

  const submitEditedDescription = async () => {
    try {
      const response = await updateActivityPost(editedPost);
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
        <Row justify="center">
          <Button
            onClick={() => {
              setShowForm(true);
              setReload(false);
            }}
            type="primary"
          >
            Edit Description
          </Button>
        </Row>
      )}
      {showForm && (
        <>
          <Row>
            <Row style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 18, margin: 0, marginRight: 10 }}>Date: </p>
              <DatePicker
                onChange={(date) => {
                  if (date)
                    setEditedPost({
                      ...editedPost,
                      date_posted: new Date(
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
              value={editedPost.activity_description}
              onChange={(text) =>
                setEditedPost({ ...editedPost, activity_description: text })
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
                submitEditedDescription();
              }}
              type="primary"
            >
              Save changes
            </Button>
          </Row>
        </>
      )}
    </>
  );
};

export default DescriptionFormUpdate;
