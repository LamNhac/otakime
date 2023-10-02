/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { getAllDocuments } from "../../../services/firebaseService";
import { CardItem } from "../../../components";
import { Card, Carousel, FloatButton, Image, Tag } from "antd";
const { Meta } = Card;
function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllDocuments("manga")
      .then(setData)
      .catch((error) => console.log(error));
  }, []);

  console.log(data);
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div className="flex flex-col gap-10">
      <Card
        hoverable
        style={{ width: "100%" }}
        cover={
          <Image
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            style={{
              height: 450,
              backgroundSize: "cover",
              backgroundPosition: "center",
              objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
              width: "100%", // Đảm bảo rằng hình ảnh sẽ có chiều rộng 100%
            }}
            preview={false}
          />
        }
      >
        <Meta title="Mới cập nhật" description="Tên truyện - Chap xx" />
      </Card>
      <Card title="xxx"></Card>

      <div className="flex gap-10" style={{ width: "100%" }}>
        <div className="" style={{ flex: 1 }}>
          <h3 className="text-lg font-bold text-center pb-5">
            Thêm truyện nổi bật!
          </h3>
          <div className="flex gap-5">
            <Card className="h-96" style={{ flex: 1 }}></Card>
            <Card className="h-96" style={{ flex: 1 }}></Card>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3 className="text-lg font-bold text-center pb-5">
            Thêm phim nổi bật!
          </h3>
          <div className="flex gap-5">
            <Card className="h-96" style={{ flex: 1 }}></Card>
            <Card className="h-96" style={{ flex: 1 }}></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
