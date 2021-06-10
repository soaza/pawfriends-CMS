import * as React from "react";
import { Row, Col, Card, Empty } from "antd";

interface IProps {
  dogImages: IDogImageEndpoint[];
}

const GalleryArr = [1, 2, 3, 4];
const ImageGallery: React.FC<IProps> = (props) => {
  const { dogImages } = props;

  return (
    <>
      <Row style={{ marginTop: 20, marginLeft: 20 }}>
        {GalleryArr.map((num) => {
          const imageToDisplay = dogImages.filter(
            (image) => image.gallery_position == num
          )[0];

          return imageToDisplay ? (
            <Col span={6}>
              <img
                style={{ height: 325, width: "100%" }}
                src={imageToDisplay.image_url}
              />
              <p style={{ fontSize: 20 }}> Gallery Image {num}</p>
            </Col>
          ) : (
            <Col span={6}>
              <Card style={{ height: 325, width: "100%" }}>
                <Empty />
              </Card>
              <p style={{ fontSize: 20 }}> Gallery Image {num}</p>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ImageGallery;
