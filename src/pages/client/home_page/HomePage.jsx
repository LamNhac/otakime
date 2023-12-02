/* eslint-disable array-callback-return */
import { Card, Col, Image, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDocuments } from "../../../services/firebaseService";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const { Meta } = Card;
function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [newMangaUpdate, setNewMangaUpdate] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments("manga")
      .then((res) => {
        setData(res);
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        const dateObjects = res.map(
          (manga) => new Date(manga.newDateUpdateChapterAt)
        );

        // Lấy ngày mới nhất
        const newestDate = new Date(Math.max.apply(null, dateObjects));

        const newestManga = res.find(
          (manga) =>
            new Date(manga.newDateUpdateChapterAt).getTime() ===
            newestDate.getTime()
        );
        setNewMangaUpdate(newestManga);
      })
      .finally(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="flex flex-col gap-10">
      <Spin spinning={isLoading}>
        <Link
          to={`/manga/${newMangaUpdate.urlManga}/${newMangaUpdate?.newNameChapter}`}
        >
          <Card
            loading={isLoading}
            hoverable
            style={{ width: "100%" }}
            cover={
              <Image
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                style={{
                  height: 300,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
                  width: "100%", // Đảm bảo rằng hình ảnh sẽ có chiều rộng 100%
                }}
                preview={false}
              />
            }
          >
            <Meta
              title="Mới cập nhật"
              description={`${newMangaUpdate?.nameManga ?? ""} - Chapter ${
                newMangaUpdate?.newNameChapter?.toString().padStart(2, 0) ?? ""
              }`}
            />
          </Card>
        </Link>
        {/* Quảng cáo  */}
        {/* <Card title="xxx"></Card> */}

        <div className="flex flex-col sm:flex-row justify-center gap-2     ">
          <Row className="w-[100%] sm:w-[48%] flex flex-row sm:flex-col gap-2">
            <Col className="text-lg font-bold text-center pb-10 flex justify-center items-center">
              Thêm truyện nổi bật!
            </Col>
            <Col>
              <Carousel
                draggable={false}
                responsive={responsive}
                showDots
                infinite
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                <Card className="h-96 min-w-[300px] bg-black"></Card>
                <Card className="h-96 min-w-[300px] bg-white"></Card>
                <Card className="h-96 min-w-[300px] bg-slate-700"></Card>
                <Card className="h-96 min-w-[300px] bg-gray-50"></Card>
              </Carousel>
            </Col>
          </Row>
          <Row className="w-[100%] sm:w-[48%] flex flex-row sm:flex-col gap-2">
            <Col className="text-lg font-bold text-center pb-10 flex justify-center items-center">
              Thêm phim nổi bật!
            </Col>
            <Col>
              <Carousel
                draggable={false}
                responsive={responsive}
                showDots
                infinite
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                <Card className="h-96 min-w-[300px] bg-black"></Card>
                <Card className="h-96 min-w-[300px] bg-white"></Card>
                <Card className="h-96 min-w-[300px] bg-slate-700"></Card>
                <Card className="h-96 min-w-[300px] bg-gray-50"></Card>
              </Carousel>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
}

export default HomePage;
