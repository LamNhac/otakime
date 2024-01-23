/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */
import { Button, Space, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AgeClassificationView,
  SkeletonView,
  ViewImage,
} from "../../../components";
import { getAllDocuments } from "../../../services/firebaseService";
function DetailMoviePage() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    setIsLoading(true);

    getAllDocuments("movie")
      .then((res) => {
        const movie = res.find((item) => item.urlMovie === movieId);
        setData(movie);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Spin
      spinning={isLoading}
      className=" min-h-screen"
      tip="Đang tải dữ liệu..."
    >
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
                <b>Lượt xem:</b> {data?.view ?? 0}
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
              <Link to={`/movie/${data?.urlMovie}/abyss`}>
                <Button type="primary" ghost block size="large">
                  Xem ngay
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Spin>
  );
}
export default DetailMoviePage;
