/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { getAllDocuments } from "../../../services/firebaseService";
import { CardItem } from "../../../components";
import { Card, Carousel, FloatButton, Image, Tag } from "antd";

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
      <div className="gap-2 flex flex-col">
        <div>
          <p>manga</p>
          <Carousel autoplay className="">
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
        <div>
          <p>movie</p>
          <Carousel autoplay className="">
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
        <p>Truyện mới cập nhật</p>
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
      <FloatButton onClick={() => console.log("click")} />
    </div>
  );
}

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default HomePage;
