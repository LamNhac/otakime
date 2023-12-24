import React from "react";
import { Link } from "react-router-dom";
import ViewImage from "./ViewImage";

export default function CardImage(props) {
  const {
    src,
    title,
    description,
    isBackdrop,
    isAgeClassification,
    ageClassification,
    to,
    height = 305,
  } = props;

  const containerClasses = "relative w-full h-full rounded-md";

  const overlayClasses = isBackdrop
    ? "absolute inset-0 bg-black opacity-50 mb-[5px]" // Chỉ áp dụng nếu isBackdrop là true
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
          <div
            className=" absolute w-10 h-10 flex items-center justify-center right-1 top-1 rounded-sm"
            style={{
              zIndex: 3,
              backgroundColor: ageClassification.bgColor,
              color: ageClassification.textColor,
            }}
          >
            <p className=" font-thin text-sm mb-0">{ageClassification.label}</p>
          </div>
        )}

        <div className={contentClasses}>
          <h2 className="font-bold text-lg">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}
