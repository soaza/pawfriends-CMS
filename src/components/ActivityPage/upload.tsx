import { Button, Input, message, Row, Col, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";

const FileUpload = () => {
  // If you are using TypeScript the state will be
  // const [file, setFile] = useState<FileList | null>(null);
  const [file, setFile] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const submitFile = async () => {
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
        .then((res) => console.log(res.data.Location));
      message.success("Image uploaded!");
    } catch (error) {
      // handle error
      message.error("Error uploading,please try again.");
    }
    setUploading(false);
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
