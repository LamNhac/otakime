import { Card, Col, Image, Row, Spin, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMAGES from "../../../constants/images";
import { getAllDocuments } from "../../../services/firebaseService";
function MangaPageClient() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments("manga")
      .then(setData)
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error);
        message.error(error);
      });
  }, []);
  console.log(data);
  return (
    <Spin
      spinning={isLoading}
      className="min-h-screen"
      tip="Đang tải dữ liệu..."
    >
      <div className="min-h-screen sm:pr-[15rem] sm:pl-[15rem] md:pr-[10rem] md:pl-[10rem]">
        <h3 className="text-center text-[2rem] font-semibold pb-8">
          Truyện mới nhất
        </h3>
        <Row gutter={[16, 16]}>
          {data?.map((item, index) => {
            return (
              <Col xs={12} sm={12} md={12} lg={12} xl={6} key={index}>
                <Link to={`/manga/${item.urlManga}`}>
                  <Card
                    hoverable
                    cover={
                      <div className="relative">
                        <div
                          className=" absolute bg-slate-500 w-16 h-16 flex items-center justify-center right-1 top-1 rounded-sm"
                          style={{ zIndex: 10 }}
                        >
                          +12
                        </div>
                        <Image
                          alt="example"
                          style={{
                            flex: 1,
                            height: 250,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
                            width: "100%", // Đảm bảo rằng hình ảnh sẽ có chiều rộng 100%
                          }}
                          src={item.imgCover ? item.imgCover : "error"}
                          fallback={IMAGES.imgDefault}
                          preview={false}
                        />
                      </div>
                    }
                  >
                    <h3>{item.nameManga}</h3>
                    <p>
                      {item.tags.map((itemTag, index) => {
                        return <Tag key={index}>{itemTag.label}</Tag>;
                      })}
                    </p>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </Spin>
  );
}

export default MangaPageClient;
