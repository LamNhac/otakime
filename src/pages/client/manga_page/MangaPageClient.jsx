import { Col, Row, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { getAllDocuments } from "../../../services/firebaseService";

import { CardImage, TopBarFilterClientView } from "../../../components";
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
  return (
    <Spin
      spinning={isLoading}
      className="min-h-screen"
      tip="Đang tải dữ liệu..."
    >
      <div className="sm:pr-[15rem] sm:pl-[15rem] md:pr-[10rem] md:pl-[10rem] flex flex-col gap-4">
        <TopBarFilterClientView
          title="Truyện mới nhất"
          onChange={(value) => {
            console.log(value);
          }}
        />

        <Row gutter={[16, 16]}>
          {data?.map((item, index) => {
            const ageClassification = item.ageClassification[0];
            return (
              <Col xs={12} sm={12} md={12} lg={12} xl={6} key={index}>
                <CardImage
                  to={`/manga/${item.urlManga}`}
                  src={item?.imgCover}
                  title={item.nameManga}
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
