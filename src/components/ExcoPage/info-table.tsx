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
import { updateExcoInfo } from "../../common/api";

const { Paragraph } = Typography;

const { useState } = React;

interface IProps {
  exco: IExcoData;
}

const labelValueMapping = [
  { value: "exco_name", label: "Name" },
  { value: "exco_year_of_study", label: "Year of Study" },
  { value: "exco_hobbies", label: "Hobbies" },
  { value: "exco_favourite_dog", label: "Favourite Dog" },
];

const InfoTable: React.FC<IProps> = (props) => {
  const { exco } = props;
  const [editableExcoInfo, setEditableExcoInfo] = useState<IExcoData>(exco);
  const [showUpdateButton, setShowUpdateButton] = useState<boolean>(false);

  const onUpdate = async () => {
    try {
      const response = await updateExcoInfo(editableExcoInfo);
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
        <Col span={24} lg={8}>
          <Card
            style={{ height: "300px", width: "100%", marginBottom: "20px" }}
          >
            <Empty />
          </Card>
        </Col>

        <Col span={24} lg={16}>
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
                        const newExcoObj = { ...editableExcoInfo };
                        newExcoObj[field] = text;
                        setEditableExcoInfo(newExcoObj);
                      },
                    }}
                  >
                    {editableExcoInfo[field]}
                    {!editableExcoInfo[field] && (
                      <span style={{ color: "gray" }}>No information</span>
                    )}
                  </Paragraph>
                </Descriptions.Item>
              );
            })}
          </Descriptions>

          <Row justify="center">
            {showUpdateButton && (
              <>
                <Button
                  style={{ marginTop: "10px", marginRight: "10px" }}
                  onClick={() => {
                    setShowUpdateButton(false);
                    setEditableExcoInfo(exco);
                  }}
                >
                  Cancel Changes
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
