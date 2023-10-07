import { Card, Image, Row, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMAGES from "../../../constants/images";
import { getAllDocuments } from "../../../services/firebaseService";
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
        <h3>MOVIE</h3>
        <Row wrap className="gap-5">
          {data?.map((item, index) => {
            return (
              <Link to={`/movie/${item.urlMovie}`} key={index}>
                <Card
                  hoverable
                  cover={
                    windowWidth < 640 && (
                      <Image
                        alt="example"
                        style={{
                          flex: 1,
                          height: 300,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
                          width: "100%", // Đảm bảo rằng hình ảnh sẽ có chiều rộng 100%
                        }}
                        src={item.imgCover ? item.imgCover : "error"}
                        fallback={IMAGES.imgDefault}
                        preview={false}
                      />
                    )
                  }
                >
                  {windowWidth < 640 ? (
                    <>
                      <div>
                        <h3>{item.nameMovie}</h3>
                        <p>{item.otherName}</p>
                        <p>{item.otherName}</p>
                        <p>{item.director}</p>
                        <p>{item.stars}</p>
                        <p>{item.studio}</p>
                        {item.tags.map((itemTag, index) => {
                          return <Tag key={index}>{itemTag.label}</Tag>;
                        })}
                        <p>{item.description}</p>
                      </div>
                    </>
                  ) : (
                    <Meta
                      avatar={
                        <Image
                          alt="example"
                          style={{
                            flex: 1,
                            height: 300,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
                            width: "100%", // Đảm bảo rằng hình ảnh sẽ có chiều rộng 100%
                          }}
                          src={item.imgCover ? item.imgCover : "error"}
                          fallback={IMAGES.imgDefault}
                          preview={false}
                        />
                      }
                      title={
                        <div>
                          <h3>{item.nameMovie}</h3>
                          <p>{item.otherName}</p>
                          <p>{item.otherName}</p>
                          <p>{item.director}</p>
                          <p>{item.stars}</p>
                          <p>{item.studio}</p>
                          {item.tags.map((itemTag, index) => {
                            return <Tag key={index}>{itemTag.label}</Tag>;
                          })}
                          <p>{item.description}</p>
                        </div>
                      }
                    />
                  )}
                </Card>
              </Link>
            );
          })}
        </Row>
      </div>
    </Spin>
  );
}

export default MoviePageClient;
