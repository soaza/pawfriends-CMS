import { Button, Input, message, Row, Col, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";

interface IProps {
  disableUpload?: boolean;
  errorMessage?: string;
  setImageUrl: (imageUrl: string) => void;
  setImageUpdated: (imageUpdated: boolean) => void;
}
const FileUpload: React.FC<IProps> = (props) => {
  const { setImageUpdated, setImageUrl, disableUpload, errorMessage } = props;
  const [file, setFile] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  console.log("disabled?", disableUpload);

  const submitFile = async () => {
    if (disableUpload) {
      message.error(errorMessage);
    } else {
      try {
        if (!file) {
          throw new Error("Select a file first!");
        }

        const formData = new FormData();
        formData.append("file", file[0]);
        setUploading(true);

        await axios
          .post(`http://localhost:3001/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => setImageUrl(res.data.Location));

        message.success("Image uploaded!");
        setImageUpdated(true);
      } catch (error) {
        // handle error
        message.error("Error uploading,please try again.");
      }
      setUploading(false);
    }
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Input
            style={{ border: "none" }}
            type="file"
            onChange={(event) => setFile(event.target.files)}
          />
        </Col>
        <Col span={12}>
          {!uploading ? (
            <Button block type="primary" onClick={() => submitFile()}>
              Upload Image
            </Button>
          ) : (
            <Button block disabled>
              Uploading...
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FileUpload;
