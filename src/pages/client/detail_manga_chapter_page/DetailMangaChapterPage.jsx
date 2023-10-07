/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Image, Space, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IMAGES from "../../../constants/images";
import { getAllDocuments } from "../../../services/firebaseService";
function DetailMangaChapterPage() {
  const { mangaId, chapterId } = useParams();
  const [data, setData] = useState(null);
  const [dataChapter, setDataChapter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
          chapter.imgChapterFile = JSON.parse(chapter.imgChapterFile);
          setDataChapter(chapter);
        });
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <Spin spinning={isLoading}>
      <Card>
        <h3>
          {data?.nameManga} / Chapter {dataChapter?.nameChapter}
        </h3>
        <p>{data?.nameMangaVie}</p>
        <p>
          Thể loại:{" "}
          <Space>
            {data?.tags?.map((item, index) => {
              return <Tag key={index}>{item.label}</Tag>;
            })}
          </Space>
        </p>
      </Card>
      <div className="flex flex-col justify-center items-center">
        {dataChapter?.imgChapterFile?.map((item, index) => {
          return (
            <Image
              key={index}
              src={item.imgUrl ? item.imgUrl : "error"}
              fallback={IMAGES.imgDefault}
              style={{ width: 800 }}
              preview={false}
            />
          );
        })}
      </div>
    </Spin>
  );
}
export default DetailMangaChapterPage;
