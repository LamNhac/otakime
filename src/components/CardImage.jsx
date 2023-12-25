import React from "react";
import { Link } from "react-router-dom";
import ViewImage from "./ViewImage";
import { EyeOutlined } from "@ant-design/icons";
import AgeClassificationView from "./AgeClassificationView";

export default function CardImage(props) {
  const {
    src,
    title,
    description,
    isBackdrop,
    isAgeClassification,
    isView,
    view,
    ageClassification,
    to,
    height = 305,
  } = props;

  const containerClasses = "relative w-full h-full rounded-md";

  const overlayClasses = isBackdrop
    ? "absolute inset-0 bg-black opacity-20 mb-[5px]" // Chỉ áp dụng nếu isBackdrop là true
    : "";

  const contentClasses = "absolute left-[1rem] bottom-[3rem] text-white";

  return (
    <Link to={to}>
      <div className={containerClasses}>
        <ViewImage
          src={src}
          preview={false}
          style={{
            height: height,
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "cover",
            width: "100%",
          }}
        />
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
        <div className={contentClasses}>
          <h2 className="font-bold xs:text-2xl sm:text-[1rem] md:text-[2rem]">
            {title}{" "}
          </h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}
