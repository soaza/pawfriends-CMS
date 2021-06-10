import * as React from "react";
import { Card, Col, Empty, message, Row, Select, Typography } from "antd";
import { postDogImage } from "../../common/api";
import FileUpload from "../ActivityPage/upload";
import Description from "./description";
import ImageGallery from "./image-gallery";

const { useState, useEffect } = React;
const { Option } = Select;

interface IProps {
  dog: any;
  dogImages: IDogImageEndpoint[];
  setRefetchApi: (refetchApi: boolean) => void;
}

const InfoTable: React.FC<IProps> = (props) => {
  const { dog, dogImages, setRefetchApi } = props;
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageUpdated, setImageUpdated] = useState<boolean>(false);
  const [imageUploadPosition, setImageUploadPosition] = useState<number>();
  const [disableUpload, setDisableUpload] = useState<boolean>(true);

  useEffect(() => {
    if (imageUpdated) {
      onImageUpdate();
      setImageUpdated(false);
    }
  }, [imageUpdated]);

  useEffect(() => {
    if (imageUploadPosition || imageUploadPosition === 0)
      setDisableUpload(false);
  }, [imageUploadPosition]);

  const onImageUpdate = async () => {
    try {
      const response = await postDogImage(
        dog.dog_id,
        imageUrl,
        imageUploadPosition ? imageUploadPosition : 0
      );
      setRefetchApi(true);
      if (response) {
        message.success("Update successful");
      } else {
        message.error("Failed to update");
      }
    } catch {
      message.error("Failed to connect to server.");
    }
  };

  const imageOptions = [
    { value: 0, label: "Cover" },
    { value: 1, label: "Gallery Image 1" },
    { value: 2, label: "Gallery Image 2" },
    { value: 3, label: "Gallery Image 3" },
    { value: 4, label: "Gallery Image 4" },
  ];

  const coverImageUrl = dogImages.filter(
    (image) => image.gallery_position == 0
  )[0]?.image_url;

  return (
    <>
      <Row>
        <Col span={24} lg={8}>
          <Card
            style={{
              textAlign: "center",
              height: "700px",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <h2>Cover Image</h2>
            {dogImages.length > 0 ? (
              <img
                style={{ height: "auto", width: "100%" }}
                src={coverImageUrl}
              />
            ) : (
              <Empty />
            )}
          </Card>

          <Row justify="space-between">
            <Col></Col>

            <Col span={12}>
              <Select
                onChange={(position: number) =>
                  setImageUploadPosition(position)
                }
                options={imageOptions}
                style={{ width: "100%" }}
                placeholder="Select Image Position"
              />
            </Col>
          </Row>

          <FileUpload
            disableUpload={disableUpload}
            errorMessage={"Please select an Image Position!"}
            setImageUrl={setImageUrl}
            setImageUpdated={setImageUpdated}
          />
        </Col>

        <Col span={24} lg={16}>
          <Description dog={dog} setRefetchApi={setRefetchApi} />

          <ImageGallery dogImages={dogImages} />
        </Col>
      </Row>
    </>
  );
};

const s = {
  description: {
    borderBlock: "2px solid",
    marginTop: "20px",
    marginLeft: "20px",
  },
  label: {
    fontSize: "20px",
    textAlign: "center",
  },
  content: {
    fontSize: "16px",
  },
};

export default InfoTable;
