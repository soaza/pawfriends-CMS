import * as React from "react";
import { Typography, Row, Card } from "antd";
import DefaultLayout from "../../components/DefaultLayout";
import { getDogs } from "../../common/api";
import InfoTable from "../../components/DogPage/info-table";

const { useEffect, useState } = React;
const { Title } = Typography;
const DogPage: React.FC = () => {
  const [dogs, setDogs] = useState<IDogData[]>();

  useEffect(() => {
    const loadDogs = async () => {
      const dogs = await getDogs();
      setDogs(dogs);
    };
    loadDogs();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Title style={{ textAlign: "center" }}>Dog Page</Title>
        {dogs &&
          dogs.map((dog) => {
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
                  <InfoTable dog={dog} />
                </Card>
              </>
            );
          })}
      </DefaultLayout>
    </>
  );
};

export default DogPage;
