import { useEffect, useState } from "react";
import { getAllDocuments } from "../../../services/firebaseService";
import { Card, Image, Tag } from "antd";

function MangaPageClient() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllDocuments("manga")
      .then(setData)
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <p>MANGA</p>
      <div className="flex flex-row gap-5">
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

export default MangaPageClient;
