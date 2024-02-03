import React from "react";
import { Link } from "react-router-dom";
import AgeClassificationView from "./AgeClassificationView";
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
    objectFit = "cover",
  } = props;

  const containerClasses = "relative w-full h-full rounded-md";

  const overlayClasses = isBackdrop
    ? "absolute inset-0 bg-black opacity-30" // Chỉ áp dụng nếu isBackdrop là true
    : "";

  const contentClasses = "absolute left-0 bottom-5 pl-5 pr-5 text-white w-full";

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
            objectFit: objectFit,
            width: "100%",
            borderRadius: 8,
          }}
        />
        {isBackdrop && src && (
          <div
            className={overlayClasses}
            style={{
              borderRadius: 8,
            }}
          ></div>
        )}
        {isAgeClassification && (
          <AgeClassificationView ageClassification={ageClassification} />
        )}

        <div className={contentClasses}>
          {title && (
            <h2
              className="font-bold xs:text-2xl sm:text-[1rem] md:text-[1.3rem]"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {title}
            </h2>
          )}
          {description && <p>{description}</p>}
        </div>
      </div>
    </Link>
  );
}
