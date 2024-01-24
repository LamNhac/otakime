import { Card, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ViewImage from "./ViewImage";
import AgeClassificationView from "./AgeClassificationView";
import { EyeOutlined } from "@ant-design/icons";

const { Meta } = Card;

export default function CardImageMovieView(props) {
  const {
    movie,
    isAgeClassification,
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
      <div>
        <ViewImage
          src={movie?.imgCover}
          preview={false}
          style={{
            height: height,
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "cover",
            width: "100%",
            borderRadius: 8,
          }}
        />
        <h2 className="font-bold xs:text-2xl sm:text-[1rem] md:text-[1.5rem] absolute top-[70%] left-5">
          {movie?.nameMovie}
        </h2>
        {isAgeClassification && (
          <AgeClassificationView
            ageClassification={movie.ageClassification[0]}
          ></AgeClassificationView>
        )}
      </div>
    </Link>
  );
}
