/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AgeClassificationView,
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
  const [totalView, setTotalView] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments("manga")
      .then((res) => {
        const manga = res.find((item) => item.urlManga === mangaId);

        setData(manga);
        document.title = `Otakime - ${manga?.nameManga}`;
        const el = document.querySelector("meta[name='description']");
        el.setAttribute("content", manga?.description);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (data?.id) {
      setIsLoadingChapter(true);
      getAllDocuments(`manga/${data?.id}/chapter`)
        .then((res) => {
          console.log("res chapter", res);
          const chapterFilter = res.sort(
            (a, b) => b.nameChapter - a.nameChapter
          );
          setDataChapter(chapterFilter);
          let _totalView = res.reduce(
            (accumulator, currentValue) => accumulator + currentValue.view,
            0
          );
          console.log(_totalView);
          setTotalView(_totalView);
        })
        .finally(() => setIsLoadingChapter(false));
    }
  }, [data?.id]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);

    // Clean up: hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <Spin
      spinning={isLoading}
      tip="Đang tải dữ liệu..."
      className="min-h-screen"
    >
      <div className="flex flex-col gap-4">
        <ViewImage
          src={windowWidth < 640 ? data?.imgCoverMobile : data?.imgCoverDesktop}
          preview={false}
          style={{
            height: "auto",
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
              <AgeClassificationView
                ageClassification={data?.ageClassification[0]}
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <div>
                <b>Tên việt:</b> {data?.nameMangaVie}
              </div>
              <div>
                <b>Tên khác:</b> {data?.otherName}
              </div>
              <div>
                <b>Tác giả:</b> {data?.author}
              </div>
              <div>
                <b>Ngày cập nhật:</b> {data?.updateAt}
              </div>
              <div>
                <b>Lượt xem:</b> {totalView}
              </div>
              <div>
                <b>Tình trạng:</b>{" "}
                <Tag color={data?.statusManga[0].color}>
                  {data?.statusManga[0].label}
                </Tag>
              </div>
              <div>
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
              </div>
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
