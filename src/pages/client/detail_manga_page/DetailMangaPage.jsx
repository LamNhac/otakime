/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  SkeletonView,
  SkeletonViewChapter,
  ViewImage,
} from "../../../components";
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
  return (
    <Spin
      spinning={isLoading}
      tip="Đang tải dữ liệu..."
      className="min-h-screen"
    >
      <div className="flex flex-col gap-6">
        <ViewImage
          src={data?.imgCover}
          preview={false}
          style={{
            height: 400,
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "cover",
            width: "100%",
          }}
        />
        {isLoading ? (
          <SkeletonView />
        ) : (
          <div className="sm:pl-4 sm:pr-4 md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">
            <div className="flex justify-between items-center ">
              <h1 className="text-[2rem] font-bold">{data?.nameManga}</h1>
              <div
                className=" w-14 h-14 flex items-center justify-center rounded-sm"
                style={{
                  zIndex: 2,
                  backgroundColor: data?.ageClassification[0].bgColor,
                  color: data?.ageClassification[0].textColor,
                }}
              >
                {data?.ageClassification[0].label}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <p>
                <b>Tên việt:</b> {data?.nameMangaVie}
              </p>
              <p>
                <b>Tên khác:</b> {data?.otherName}
              </p>
              <p>
                <b>Tác giả:</b> {data?.author}
              </p>
              <p>
                <b>Ngày cập nhật:</b> {data?.updateAt}
              </p>
              <p>
                <b>Tình trạng:</b>{" "}
                <Tag color={data?.statusManga[0].color}>
                  {data?.statusManga[0].label}
                </Tag>
              </p>
              <p>
                <b>Thể loại: </b>
                <Space>
                  {data?.tags.map((item, index) => {
                    return (
                      <Tag key={index} color="blue">
                        {item.label}
                      </Tag>
                    );
                  })}
                </Space>
              </p>
            </div>
          </div>
        )}

        {isLoadingChapter ? (
          <SkeletonViewChapter />
        ) : (
          <div className="flex flex-col gap-2">
            {dataChapter?.map((item, index) => {
              return (
                <Link to={`${item.nameChapter}`} key={index}>
                  <div className="w-[100%] p-4 border rounded-sm flex justify-between items-center">
                    <p className="text-center">Chapter {item.nameChapter} </p>
                    <p>Ngày cập nhật: {item.updateChapterAt}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Spin>
  );
}

export default DetailMangaPage;
