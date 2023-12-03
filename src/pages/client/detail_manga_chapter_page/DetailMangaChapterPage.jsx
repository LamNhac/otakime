/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Image, Row, Select, Space, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IMAGES from "../../../constants/images";
import { getAllDocuments } from "../../../services/firebaseService";
import {
  LeftOutlined,
  RightOutlined,
  UnorderedListOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ViewImage } from "../../../components";

function DetailMangaChapterPage() {
  let { mangaId, chapterId } = useParams();
  const [data, setData] = useState(null);
  const [dataChapter, setDataChapter] = useState(null);
  const [selectChapter, setSelectChapter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments("manga")
      .then((res) => {
        const manga = res.find((item) => item.urlManga === mangaId);
        setData(manga);

        getAllDocuments(`manga/${manga.id}/chapter`).then((res) => {
          const chapter = res.find(
            (item) => item.nameChapter === parseInt(chapterId)
          );

          console.log("res", res);
          const options = res.map((item) => ({
            label: `Chapter ${item.nameChapter}`,
            chapter: item.nameChapter,
            value: item.id,
            id: item.id,
          }));
          setSelectChapter(options);

          chapter.imgChapterFile = JSON.parse(chapter.imgChapterFile);
          setDataChapter(chapter);
        });
      })
      .finally(() => setIsLoading(false));
  }, [chapterId]);
  const currentChapterId = chapterId ? parseInt(chapterId, 10) : null;

  const isBackDisabled = currentChapterId === 1 || !currentChapterId;

  const isForwardDisabled =
    currentChapterId === null ||
    selectChapter?.length === 0 ||
    currentChapterId === selectChapter?.length;

  return (
    <Spin spinning={isLoading}>
      <Card>
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
      <Card>
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
      </Card>
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
