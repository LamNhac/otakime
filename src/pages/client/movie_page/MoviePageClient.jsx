import { Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  CardImage,
  SkeletionMovie,
  TopBarFilterClientView,
} from "../../../components";
import { getAllDocuments } from "../../../services/firebaseService";

function MoviePageClient() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments("movie")
      .then(setData)
      .finally(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Spin spinning={isLoading} tip="Đang tải dữ liệu...">
      <div className="sm:pr-[15rem] sm:pl-[15rem] md:pr-[10rem] md:pl-[10rem] flex flex-col gap-4">
        <TopBarFilterClientView
          title="Phim mới nhất"
          onChange={(value) => {
            console.log(value);
          }}
        />
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
            </>
          ) : (
            data?.map((item, index) => {
              const ageClassification = item.ageClassification[0];
              return (
                <Col xs={12} sm={12} md={12} lg={12} xl={6} key={index}>
                  <CardImage
                    to={`/movie/${item.urlMovie}`}
                    src={item?.imgMain}
                    title={item.nameMovie}
                    isBackdrop
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
