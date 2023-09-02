/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { getAllDocuments } from "../../../services/firebaseService";
import { CardItem } from "../../../components";
import { Card, Image, Tag } from "antd";

function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllDocuments("manga")
      .then(setData)
      .catch((error) => console.log(error));
  }, []);

  console.log(data);

  return (
    <div>
      <div className="gap-2 flex flex-row">
        {data?.map((item, index) => {
          return (
            <Card key={index}>
              <Image src={item.imgMain} />
              <h3>{item.nameManga}</h3>
              <p>
                {item.tags.map((itemTag, index) => {
                  return <Tag key={index}>{itemTag.label}</Tag>;
                })}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
export default HomePage;
