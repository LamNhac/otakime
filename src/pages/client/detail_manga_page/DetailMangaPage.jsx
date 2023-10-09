/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Image, Row, Space, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IMAGES from "../../../constants/images";
import { getAllDocuments } from "../../../services/firebaseService";
function DetailMangaPage() {
  const { mangaId } = useParams();

  const [data, setData] = useState(null);
  const [dataChapter, setDataChapter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChapter, setIsLoadingChapter] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments("manga")
      .then((res) => {
        const manga = res.find((item) => item.urlManga === mangaId);
        setData(manga);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (data?.id) {
      setIsLoadingChapter(true);
      getAllDocuments(`manga/${data?.id}/chapter`)
        .then((res) => {
          setDataChapter(res);
          console.log(res);
        })
        .finally(() => setIsLoadingChapter(false));
    }
  }, [data?.id]);
  console.log(dataChapter);
  return (
    <Spin
      spinning={isLoading}
      tip="Đang tải dữ liệu..."
      className="min-h-screen"
    >
      <div>
        <Row gutter={[12, 12]}>
          <Col flex="auto">
            <Image
              src={data?.imgCover ? data?.imgCover : "error"}
              fallback={IMAGES.imgDefault}
              preview={false}
              width={300}
            ></Image>
          </Col>
          <Col flex="auto">
            <div>
              <h3>Tên manga: {data?.nameManga}</h3>
              <p>Tên việt: {data?.nameMangaVie}</p>
              <p>Tên khác: {data?.otherMagna}</p>
              <p>Tác giả: {data?.author}</p>
              <p>Ngày cập nhật: {data?.updateAt}</p>
              <span>
                Thể loại:
                <Space>
                  {data?.tags.map((item, index) => {
                    return <Tag key={index}>{item.label}</Tag>;
                  })}
                </Space>
              </span>
            </div>
          </Col>
        </Row>
        <Spin spinning={isLoadingChapter}>
          <Space>
            {dataChapter?.map((item, index) => {
              return (
                <Link to={`${item.nameChapter}`} key={index}>
                  <Card type="primary" key={index} hoverable>
                    <p className="text-center">Chapter {item.nameChapter} </p>
                    <p>Ngày cập nhật: {item.updateChapterAt}</p>
                  </Card>
                </Link>
              );
            })}
          </Space>
        </Spin>
      </div>
    </Spin>
  );
}

export default DetailMangaPage;
