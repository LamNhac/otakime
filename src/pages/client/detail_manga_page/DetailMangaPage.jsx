/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
      <div className="flex flex-col gap-10">
        <div
          style={{
            backgroundImage: `url("${data?.imgCover}")`,
            width: "100%",
            minHeight: 400,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="flex justify-between items-center ">
          <h1>{data?.nameManga}</h1>
          <div
            className="  bg-slate-500 w-16 h-16 flex items-center justify-center right-1 top-1 rounded-sm"
            style={{ zIndex: 2 }}
          >
            +12
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>Tên việt: {data?.nameMangaVie}</p>
          <p>Tên khác: {data?.otherName}</p>
          <p>Tác giả: {data?.author}</p>
          <p>Ngày cập nhật: {data?.updateAt}</p>
          <span>
            Thể loại:{" "}
            <Space>
              {data?.tags.map((item, index) => {
                return <Tag key={index}>{item.label}</Tag>;
              })}
            </Space>
          </span>
        </div>
        <Spin spinning={isLoadingChapter}>
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
        </Spin>
      </div>
    </Spin>
  );
}

export default DetailMangaPage;
