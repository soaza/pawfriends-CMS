import DefaultLayout from "../../components/DefaultLayout";
import { Card, Typography } from "antd";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getMainDescription } from "../../common/api";
import DescriptionForm from "../../components/MainPage/DescriptionForm";

const { Title } = Typography;

const { useEffect, useState } = React;

const MainPage: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    const loadDescription = async () => {
      const description = await getMainDescription();
      setDescription(description);
    };
    loadDescription();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Title style={{ textAlign: "center" }}>Main Page</Title>
        <Card
          style={{
            borderRadius: "10px",
            borderWidth: "5px",
            borderStyle: "solid",
            borderColor: "#001628",
            marginBottom: "20px",
          }}
        >
          {" "}
          {description}
        </Card>
        <DescriptionForm description={description} />
      </DefaultLayout>
    </>
  );
};

export default MainPage;
