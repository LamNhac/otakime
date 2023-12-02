/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Image, Space, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllDocuments } from "../../../services/firebaseService";
import IMAGES from "../../../constants/images";
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
        <Image
          alt="example"
          style={{
            flex: 1,
            height: 400,
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
          }}
          src={data?.imgCover ? data?.imgCover : "error"}
          fallback={IMAGES.imgDefault}
          preview={false}
        />
        {/* <div
          style={{
            backgroundImage: `url("${data?.imgCover}")`,
            width: "100%",
            minHeight: 400,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div> */}
        <div className="sm:pl-4 sm:pr-4 md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">
          <div className="flex justify-between items-center ">
            <h1 className="text-xl font-bold">{data?.nameManga}</h1>
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
            <p>Tên việt: {data?.nameMangaVie}</p>
            <p>Tên khác: {data?.otherName}</p>
            <p>Tác giả: {data?.author}</p>
            <p>Ngày cập nhật: {data?.updateAt}</p>
            <p>
              Tình trạng:{" "}
              <Tag color={data?.statusManga[0].color}>
                {data?.statusManga[0].label}
              </Tag>
            </p>
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
          </Spin>
        </div>
      </div>
    </Spin>
  );
}

export default DetailMangaPage;
