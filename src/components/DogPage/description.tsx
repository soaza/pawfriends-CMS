import * as React from "react";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  message,
  Row,
  Typography,
} from "antd";
import { postDogImage, updateDogInfo } from "../../common/api";
import FileUpload from "../ActivityPage/upload";

const { Paragraph } = Typography;
const { useState, useEffect } = React;

interface IProps {
  dog: any;
  setRefetchApi: (refetchApi: boolean) => void;
}

const labelValueMapping = [
  { value: "dog_name", label: "Name" },
  { value: "dog_gender", label: "Gender" },
  { value: "dog_age", label: "Age" },
];

const Description: React.FC<IProps> = (props) => {
  const { dog, setRefetchApi } = props;
  const [editableDogInfo, setEditableDogInfo] = useState<IDogData>(dog);
  const [showUpdateButton, setShowUpdateButton] = useState<boolean>(false);

  const onUpdate = async () => {
    try {
      const response = await updateDogInfo(editableDogInfo);
      if (response) {
        message.success("Update successful");
      } else {
        message.error("Failed to update");
      }
    } catch {
      message.error("Failed to connect to server.");
    }
    setRefetchApi(true);
  };

  return (
    <>
      <Descriptions
        style={s.description}
        labelStyle={s.label as any}
        contentStyle={s.content}
        bordered
      >
        {labelValueMapping.map((row) => {
          const field = row.value;

          return (
            <Descriptions.Item label={row.label} span={3}>
              <Paragraph
                editable={{
                  tooltip: "Click to edit text",
                  onChange: (text) => {
                    setShowUpdateButton(true);
                    const newDogObj = { ...editableDogInfo };
                    newDogObj[field] = text;
                    setEditableDogInfo(newDogObj);
                  },
                }}
              >
                {editableDogInfo[field]}
                {!editableDogInfo[field] && (
                  <span style={{ color: "gray" }}>No information</span>
                )}
              </Paragraph>
            </Descriptions.Item>
          );
        })}

        <Descriptions.Item label={"Characteristics"} span={3}>
          <Paragraph
            editable={{
              tooltip: "Click to edit text",
              onChange: (text) => {
                setShowUpdateButton(true);
                const newDogObj = { ...editableDogInfo };
                newDogObj["dog_characteristics"] = text;
                setEditableDogInfo(newDogObj);
              },
            }}
          >
            {editableDogInfo.dog_characteristics}
            {!editableDogInfo.dog_characteristics && (
              <span style={{ color: "gray" }}>No information</span>
            )}
          </Paragraph>
        </Descriptions.Item>
      </Descriptions>

      <Row justify="center">
        {showUpdateButton && (
          <>
            <Button
              style={{ marginTop: "10px", marginRight: "10px" }}
              onClick={() => {
                setShowUpdateButton(false);
                setEditableDogInfo(dog);
              }}
            >
              Discard Changes
            </Button>

            <Button
              style={{ marginTop: "10px" }}
              onClick={() => {
                onUpdate();
                setShowUpdateButton(false);
              }}
              type="primary"
            >
              Save Changes
            </Button>
          </>
        )}
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

export default Description;
