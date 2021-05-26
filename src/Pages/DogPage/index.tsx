import { Typography } from "antd";
import DefaultLayout from "../../components/DefaultLayout";

const { Title } = Typography;
const DogPage: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <Title>Dog Page</Title>
      </DefaultLayout>
    </>
  );
};

export default DogPage;
