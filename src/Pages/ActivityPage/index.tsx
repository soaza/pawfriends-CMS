import DefaultLayout from "../../components/DefaultLayout";
import { Button, Card, Row, Typography } from "antd";
import React from "react";
import ReactHTMLParser from "react-html-parser";
import { getActivityPosts } from "../../common/api";
import DescriptionForm from "../../components/ActivityPage/description-form";
import dateFormat from "dateformat";

const { Title } = Typography;

const { useEffect, useState } = React;

const ActivityPage: React.FC = () => {
  const [posts, setPosts] = useState<IActivityPosts[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await getActivityPosts();
      setPosts(posts);
    };
    loadPosts();
  }, [reload]);

  return (
    <DefaultLayout>
      <Title style={{ textAlign: "center" }}>Activity Page</Title>

      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <>
              <>
                <Card
                  style={{
                    borderRadius: "10px",
                    borderWidth: "5px",
                    borderStyle: "solid",
                    borderColor: "#001628",
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}
                >
                  <>
                    <b>Date: </b>
                    {post.date_posted &&
                      String(post.date_posted).substring(0, 10)}
                    <br />
                    <br />
                    {ReactHTMLParser(post.activity_description)}
                  </>
                </Card>
              </>

              <DescriptionForm setReload={setReload} post={post} />
            </>
          );
        })}
    </DefaultLayout>
  );
};

export default ActivityPage;
