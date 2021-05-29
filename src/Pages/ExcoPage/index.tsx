import DefaultLayout from "../../components/DefaultLayout";
import * as React from "react";
import { Typography, Card } from "antd";
import { getExcos } from "../../common/api";
import InfoTable from "../../components/ExcoPage/info-table";

const { useEffect, useState } = React;
const { Title } = Typography;

const ExcoPage: React.FC = () => {
  const [excos, setExcos] = useState<IExcoData[]>();

  useEffect(() => {
    const loadExcos = async () => {
      const excos = await getExcos();
      setExcos(excos);
    };
    loadExcos();
  }, []);
  return (
    <DefaultLayout>
      <Title style={{ textAlign: "center" }}>Exco Page</Title>
      {excos &&
        excos.map((exco) => {
          return (
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
                <InfoTable exco={exco} />
              </Card>
            </>
          );
        })}
    </DefaultLayout>
  );
};

export default ExcoPage;
