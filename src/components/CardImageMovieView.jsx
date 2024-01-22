import { Card, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ViewImage from "./ViewImage";
import AgeClassificationView from "./AgeClassificationView";
import { EyeOutlined } from "@ant-design/icons";

export default function CardImageMovieView(props) {
  const {
    movie,
    isAgeClassification,
    isView,
    view,
    ageClassification,
    to,
    height = 305,
  } = props;
  // const containerClasses = "relative w-full h-full rounded-md";

  // const overlayClasses = isBackdrop
  //   ? "absolute inset-0 bg-black opacity-20 mb-[5px]" // Chỉ áp dụng nếu isBackdrop là true
  //   : "";

  // const contentClasses = "absolute left-[1rem] bottom-[3rem] text-white";

  console.log("movie", movie);
  return (
    <Link to={to}>
      <Card
        cover={
          <ViewImage
            src={movie?.imgCover}
            preview={false}
            style={{
              height: height,
              backgroundSize: "cover",
              backgroundPosition: "center",
              objectFit: "cover",
              width: "100%",
            }}
          />
        }
      >
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="font-bold xs:text-2xl sm:text-[1rem] md:text-[1.5rem]">
              {movie?.nameMovie}
            </h2>
            {isAgeClassification && (
              <AgeClassificationView
                ageClassification={movie.ageClassification[0]}
              ></AgeClassificationView>
            )}
          </div>

          <p>Tên khác: {movie?.otherName}</p>
          <p>Đạo diễn: {movie?.director}</p>
          <p>Diễn viên: {movie?.stars}</p>
          <p>Biên kịch: {movie?.writer}</p>
          <p>
            Thể loại:{" "}
            {movie.tags.map((itemTag, index) => {
              return (
                <Tag key={index} color="blue">
                  {itemTag.label}
                </Tag>
              );
            })}
          </p>
          <p>
            Trạng thái:{" "}
            <Tag color={movie.statusMovie[0].color}>
              {movie.statusMovie[0].label}
            </Tag>
          </p>
          <p>Mô tả: {movie?.description}</p>
        </div>
      </Card>
      {/* <div className={containerClasses}>
        {isBackdrop && <div className={overlayClasses}></div>}
        {isAgeClassification && (
          <AgeClassificationView ageClassification={ageClassification} />
        )}
        {isView && (
          <div className="absolute top-[1rem] left-[1rem]">
            <h3 className="text-lg text-white">
              {view ?? 0} <EyeOutlined />
            </h3>
          </div>
        )}
      </div> */}
    </Link>
  );
}
