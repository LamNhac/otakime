/* eslint-disable array-callback-return */
import { Card, Carousel, Col, Image, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDocuments } from "../../../services/firebaseService";
const { Meta } = Card;
function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllDocuments("manga")
      .then(setData)
      .catch((error) => console.log(error));
  }, []);

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

      <div wrap className="flex flex-col sm:flex-row justify-center gap-2     ">
        <div className="w-[100%] sm:w-[48%]">
          <h3 className="text-lg font-bold text-center pb-5">
            Thêm truyện nổi bật!
          </h3>
          <Carousel afterChange={onChange}>
            <div className="relative">
              <Link to="">
                <Image
                  src="https://picsum.photos/200/300"
                  width="100%"
                  style={contentStyle}
                  preview={false}
                />
                <h2 className=" absolute text-red z-10 bottom-10">
                  Tên truyện
                </h2>
              </Link>
            </div>
          </Carousel>
        </div>
        <Row className="w-[100%] sm:w-[48%] flex flex-row sm:flex-col gap-2">
          <Col className="text-lg font-bold text-center pb-5 flex justify-center items-center">
            Thêm phim nổi bật!
          </Col>
          <Col className="flex gap-2 overflow-x-scroll sm:overflow-auto">
            <Card className="h-96 min-w-[300px] bg-black"></Card>
            <Card className="h-96  min-w-[300px] bg-black"></Card>
            <Card className="h-96  min-w-[300px] bg-black"></Card>
            <Card className="h-96  min-w-[300px] bg-black"></Card>
            <Card className="h-96  min-w-[300px] bg-black"></Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
const contentStyle = {
  margin: 0,
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default HomePage;
