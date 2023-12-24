import { Card, Col, Image, Row, Spin, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMAGES from "../../../constants/images";
import { getAllDocuments } from "../../../services/firebaseService";

import { CardImage } from "../../../components";
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
      <div className="min-h-screen sm:pr-[15rem] sm:pl-[15rem] md:pr-[10rem] md:pl-[10rem] flex flex-col gap-4">
        <h3 className="text-center text-[2rem] font-semibold">
          Truyện mới nhất
        </h3>
        {/* <Row justify="end">
          <Col>
            <SelectAgeClassification
              onChange={(e) => {
                console.log("e", e);
              }}
            />
          </Col>
        </Row> */}
        <Row gutter={[16, 16]}>
          {data?.map((item, index) => {
            const ageClassification = item.ageClassification[0];
            return (
              <Col xs={12} sm={12} md={12} lg={12} xl={6} key={index}>
                {/* <Link to={`/manga/${item.urlManga}`}>
                  <Card
                    hoverable
                    cover={
                      <div className="relative">
                        <div
                          className=" absolute  w-14 h-14 flex items-center justify-center right-1 top-1 rounded-md"
                          style={{
                            zIndex: 2,
                            backgroundColor: ageClassification.bgColor,
                            color: ageClassification.textColor,
                          }}
                        >
                          {ageClassification.label}
                        </div>
                        <Image
                          alt="example"
                          style={{
                            flex: 1,
                            height: 250,
                            width: "100%",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
                          }}
                          src={item?.imgCover ? item?.imgCover : "error"}
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
                </Link> */}
                <CardImage
                  to={`/manga/${item.urlManga}`}
                  src={item?.imgCover}
                  title={item.nameManga}
                  description={item.tags.map((itemTag, index) => {
                    return (
                      <Tag key={index} color="blue">
                        {itemTag.label}
                      </Tag>
                    );
                  })}
                  isBackdrop
                  isAgeClassification
                  ageClassification={ageClassification}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </Spin>
  );
}

export default MangaPageClient;
