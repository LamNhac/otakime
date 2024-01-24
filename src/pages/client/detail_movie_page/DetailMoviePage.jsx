/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */
import { Button, Space, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  AgeClassificationView,
  SkeletonView,
  ViewImage,
} from "../../../components";
import {
  getAllDocuments,
  updateDocument,
} from "../../../services/firebaseService";
import DetailMovieUrlPage from "./DetailMovieUrlPage";
function DetailMoviePage() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [searchParam] = useSearchParams();
  const [isRenderUrlPage, setIsRenderUrlPage] = useState(false);
  const [lastView] = useState(localStorage.getItem("lastViewMovie"));
  let server = searchParam.get("server");

  useEffect(() => {
    if (server) {
      setIsRenderUrlPage(true);
    }
  }, [server]);

  useEffect(() => {
    const handleBack = (event) => {
      // Kiểm tra xem đường dẫn hiện tại có chứa tham số "?server=abyss" hay không
      setIsRenderUrlPage(false);
      const newUrl = event.currentTarget.location.href;
      if (newUrl.includes("server=abyss")) {
        setIsRenderUrlPage(true);
      }
    };
    window.addEventListener("popstate", handleBack);
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getAllDocuments("movie")
      .then((res) => {
        const movie = res.find((item) => item.urlMovie === movieId);
        setData(movie);

        // Nếu vượt quá 1 phút thì mới update lại view
        if (!lastView || Date.now() - parseInt(lastView) > 60000) {
          updateLastView();
          updateDocument("movie", movie.id, { ...movie, view: movie.view + 1 });
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const updateLastView = () => {
    // Cập nhật giá trị lastview vào local storage
    localStorage.setItem("lastViewMovie", Date.now());

    // Thực hiện các bước khác để set view theo logic của bạn
    console.log("View updated!");
  };
  console.log("isRenderUrlPage", isRenderUrlPage);
  return (
    <Spin
      spinning={isLoading}
      className=" min-h-screen"
      tip="Đang tải dữ liệu..."
    >
      {isRenderUrlPage ? (
        <iframe
          style={{
            width: "100%",
            minHeight: "100vh",
          }}
          src={data?.urlSourceMovie}
          allowFullScreen
          // allowtransparency
          allow="autoplay"
        ></iframe>
      ) : (
        <div className="flex flex-col gap-4">
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
                <h1 className="text-[2rem] font-bold">{data?.nameMovie}</h1>
                <AgeClassificationView
                  ageClassification={data?.ageClassification[0] ?? []}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <div>
                  <b>Tên khác:</b> {data?.otherName}
                </div>
                <div>
                  <b>Đạo diễn:</b> {data?.director}
                </div>
                <div>
                  <b>Biên kịch:</b> {data?.writer}
                </div>
                <div>
                  <b>Diễn viên:</b> {data?.stars}
                </div>
                <div>
                  <b>Studio:</b> {data?.studio}
                </div>
                <div>
                  <b>Ngày cập nhật:</b> {data?.updateAt}
                </div>
                <div>
                  <b>Lượt xem:</b> {data?.view.toLocaleString("vi-vn") ?? 0}
                </div>
                <div>
                  <b>Tình trạng:</b>{" "}
                  <Tag color={data?.statusMovie[0].color}>
                    {data?.statusMovie[0].label}
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
                <div>
                  <b>Mô tả:</b> {data?.description ?? 0}
                </div>
                <Link to={`/movie/${data?.urlMovie}?server=abyss`}>
                  <Button type="primary" ghost block size="large">
                    Xem ngay
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </Spin>
  );
}
export default DetailMoviePage;
