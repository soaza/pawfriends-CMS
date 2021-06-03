import DefaultLayout from "../../components/DefaultLayout";
import { Button, Card, Row, Typography } from "antd";
import React from "react";
import ReactHTMLParser from "react-html-parser";
import { getMainDescription } from "../../common/api";
import DescriptionForm from "../../components/MainPage/description-form";

const { Title } = Typography;

const { useEffect, useState } = React;

const MainPage: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  useEffect(() => {
    const loadDescription = async () => {
      const description = await getMainDescription();
      setDescription(description);
    };
    loadDescription();
  }, [showForm]);

  return (
    <>
      <DefaultLayout>
        <Title style={{ textAlign: "center" }}>Main Page</Title>

        {!showForm && (
          <>
            <Card
              style={{
                borderRadius: "10px",
                borderWidth: "5px",
                borderStyle: "solid",
                borderColor: "#001628",
                marginBottom: "20px",
              }}
            >
              {ReactHTMLParser(description)}
            </Card>

            <Row justify="center">
              <Button onClick={() => setShowForm(true)} type="primary">
                Edit Description{" "}
              </Button>
            </Row>
          </>
        )}

        {showForm && (
          <DescriptionForm
            setShowForm={setShowForm}
            description={description}
          />
        )}
      </DefaultLayout>
    </>
  );
};

export default MainPage;
