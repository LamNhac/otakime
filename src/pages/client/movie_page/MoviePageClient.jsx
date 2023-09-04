import { Card, Image, Tag } from "antd";
import { useEffect, useState } from "react";
import { getAllDocuments } from "../../../services/firebaseService";

function MoviePageClient() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllDocuments("movie")
      .then(setData)
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <p>MOVIE</p>
      <div className="flex flex-row gap-5">
        {data?.map((item, index) => {
          return (
            <Card key={index}>
              <Image src={item.imgMain} />
              <h3>{item.nameMovie}</h3>
              {/* <p>
                {item.tags.map((itemTag, index) => {
                  return <Tag key={index}>{itemTag.label}</Tag>;
                })}
              </p> */}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default MoviePageClient;
