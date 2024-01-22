import { Card, Col, Image, Input, Row, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMAGES from "../../../constants/images";
import { getAllDocuments } from "../../../services/firebaseService";
import { CardImageMovieView, SkeletionMovie } from "../../../components";
const { Meta } = Card;

function MoviePageClient() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments("movie")
      .then(setData)
      .finally(() => setIsLoading(false))
      .catch((error) => console.log(error));

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Đăng ký sự kiện thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Lấy kích thước màn hình ban đầu khi component được tạo
    setWindowWidth(window.innerWidth);

    // Hủy đăng ký sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Spin
      spinning={isLoading}
      className="min-h-screen"
      tip="Đang tải dữ liệu..."
    >
      <div className="min-h-screen">
        <div className="flex gap-12 items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">MOVIE</h3>
          <Input style={{ maxWidth: 300 }} placeholder="Tìm kiếm..." />
        </div>

        <Row gutter={[12, 12]} wrap>
          {data.length === 0 ? (
            <>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SkeletionMovie />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SkeletionMovie />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SkeletionMovie />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SkeletionMovie />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SkeletionMovie />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SkeletionMovie />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SkeletionMovie />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SkeletionMovie />
              </Col>
            </>
          ) : (
            data?.map((item, index) => {
              const ageClassification = item.ageClassification[0];
              return (
                <Col xs={12} sm={12} md={12} lg={12} xl={6} key={index}>
                  <CardImageMovieView
                    to={`/movie/${item.urlMovie}`}
                    movie={item}
                    isAgeClassification
                    ageClassification={ageClassification}
                  />
                </Col>
              );
            })
          )}
        </Row>
      </div>
    </Spin>
  );
}

export default MoviePageClient;
