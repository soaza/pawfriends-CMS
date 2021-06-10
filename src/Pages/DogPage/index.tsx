import * as React from "react";
import { Typography, Card } from "antd";
import DefaultLayout from "../../components/DefaultLayout";
import { getDogs } from "../../common/api";
import InfoTable from "../../components/DogPage/info-table";

const { useEffect, useState } = React;
const { Title } = Typography;

const DogPage: React.FC = () => {
  const [dogs, setDogs] = useState<IDogData[]>();
  const [images, setImages] = useState<IDogImageEndpoint[]>([]);
  const [refetchApi, setRefetchApi] = useState<boolean>(false);

  const loadDogs = async () => {
    const res = await getDogs();
    setDogs(res.dogs);
    setImages(res.images);
  };

  useEffect(() => {
    loadDogs();
  }, [refetchApi]);

  return (
    <>
      <DefaultLayout>
        <Title style={{ textAlign: "center" }}>Dog Page</Title>
        {dogs &&
          images &&
          dogs.map((dog) => {
            const dogImages = images.filter(
              (image) => image.dog_id == dog.dog_id
            );
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
                  <InfoTable
                    setRefetchApi={setRefetchApi}
                    dogImages={dogImages}
                    dog={dog}
                  />
                </Card>
              </>
            );
          })}
      </DefaultLayout>
    </>
  );
};

export default DogPage;
