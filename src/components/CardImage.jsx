import React from "react";
import ViewImage from "./ViewImage";
import { Link } from "react-router-dom";

export default function CardImage(props) {
  const { src, title, description, isBackdrop, to } = props;

  const containerClasses = "relative w-full h-full";

  const overlayClasses = isBackdrop
    ? "absolute inset-0 bg-black opacity-50 mb-[5px]" // Chỉ áp dụng nếu isBackdrop là true
    : "";

  const contentClasses = "absolute left-[2rem] bottom-[5rem] text-white";

  return (
    <Link to={to}>
      <div className={containerClasses}>
        <ViewImage
          src={src}
          preview={false}
          style={{
            height: 305,
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "cover",
            width: "100%",
          }}
        />
        {isBackdrop && <div className={overlayClasses}></div>}
        <div className={contentClasses}>
          <h2 className="font-bold text-lg">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}
