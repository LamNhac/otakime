/* eslint-disable react-hooks/exhaustive-deps */
import {
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Card, FloatButton, Row, Select, Space, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ViewImage } from "../../../components";
import IMAGES from "../../../constants/images";
import {
  getAllDocuments,
  updateDocument,
} from "../../../services/firebaseService";

function DetailMangaChapterPage() {
  let { mangaId, chapterId } = useParams();
  const [data, setData] = useState(null);
  const [dataChapter, setDataChapter] = useState(null);
  const [selectChapter, setSelectChapter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    //Lấy danh sách manga
    getAllDocuments("manga")
      .then((res) => {
        const manga = res.find((item) => item.urlManga === mangaId);
        setData(manga);

        //Lấy danh sách chapter
        getAllDocuments(`manga/${manga.id}/chapter`).then((res) => {
          const chapter = res.find(
            (item) => item.nameChapter === parseInt(chapterId)
          );

          //Tạo danh sách select chapter
          const options = res.map((item) => ({
            label: `Chapter ${item.nameChapter}`,
            chapter: item.nameChapter,
            value: item.id,
            id: item.id,
          }));
          setSelectChapter(options);

          //Convert ảnh
          chapter.imgChapterFile = JSON.parse(chapter.imgChapterFile);
          setDataChapter(chapter);

          //Cập nhật lượt View
          // updateDocument(`manga/${manga.id}/chapter`, chapterId, {
          //   ...res,
          //   imgChapterFile: JSON.parse(chapter.imgChapterFile),
          // }).then((res) => {});
        });
      })
      .finally(() => setIsLoading(false));
  }, [chapterId]);

  //Xử lý cho chapter
  const currentChapterId = chapterId ? parseInt(chapterId, 10) : null;

  const isBackDisabled = currentChapterId === 1 || !currentChapterId;

  const isForwardDisabled =
    currentChapterId === null ||
    selectChapter?.length === 0 ||
    currentChapterId === selectChapter?.length;

  return (
    <Spin spinning={isLoading}>
      <FloatButton.BackTop style={{ insetBlockEnd: 20, insetInlineEnd: 20 }} />
      <Card className="mb-5">
        <h3>
          {data?.nameManga} / Chapter {dataChapter?.nameChapter}
        </h3>
        <p>{data?.nameMangaVie}</p>
        <div>
          Thể loại:{" "}
          <Space>
            {data?.tags?.map((item, index) => {
              return <Tag key={index}>{item.label}</Tag>;
            })}
          </Space>
        </div>
      </Card>
      <div className="sticky top-0 z-[10] descreased-padding w-[100%] bg-white p-2 drop-shadow-lg">
        <Row align="center" style={{ gap: 10 }}>
          <Link to="/">
            <Button shape="circle" icon={<HomeOutlined />}></Button>
          </Link>
          <Link to={`/manga/${mangaId}`}>
            <Button shape="circle" icon={<UnorderedListOutlined />}></Button>
          </Link>
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={() => navigate(`/manga/${mangaId}/${--chapterId}`)}
            disabled={isBackDisabled}
          ></Button>
          <Select
            defaultActiveFirstOption={false}
            options={selectChapter}
            value={`Chapter ${chapterId}`}
            onChange={(selectedItems) => {
              const selectedLabelsAndValues = selectChapter.find(
                (item) => item.id === selectedItems
              );

              navigate(`/manga/${mangaId}/${selectedLabelsAndValues.chapter}`);
            }}
            placeholder="Chọn chapter..."
          ></Select>
          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={() => navigate(`/manga/${mangaId}/${++chapterId}`)}
            disabled={isForwardDisabled}
          ></Button>
        </Row>
      </div>

      <div className="flex flex-col justify-center items-center">
        {dataChapter?.imgChapterFile?.map((item, index) => {
          return (
            <ViewImage
              key={index}
              src={item.imgUrl ? item.imgUrl : "error"}
              fallback={IMAGES.imgDefault}
              style={{ width: 800 }}
            />
          );
        })}
      </div>
    </Spin>
  );
}
export default DetailMangaChapterPage;
