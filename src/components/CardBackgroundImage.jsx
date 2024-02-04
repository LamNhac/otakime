/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AgeClassificationView from "./AgeClassificationView";
import { Link } from "react-router-dom";
import ImageDefaultView from "./ImageDefaultView";
export default function CardBackgroundImage(props) {
  const {
    src,
    title,
    description,
    isBackdrop,
    isAgeClassification,
    ageClassification,
    to,
  } = props;
  const [imageBlobUrl, setImageBlobUrl] = useState(src);
  const handleImageLoad = () => {
    URL.revokeObjectURL(imageBlobUrl);
  };
  useEffect(() => {
    const loadImageFromUrl = async () => {
      try {
        const response = await fetch(src);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setImageBlobUrl(blobUrl);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };
    loadImageFromUrl();

    // Cleanup: Giải phóng URL Blob khi component unmount
    return () => {
      if (imageBlobUrl) {
        URL.revokeObjectURL(imageBlobUrl);
      }
    };
  }, [src]);
  const containerClasses = "relative w-full h-full rounded-md";

  const overlayClasses = isBackdrop
    ? "absolute inset-0 bg-black opacity-40" // Chỉ áp dụng nếu isBackdrop là true
    : "";

  const contentClasses = "absolute left-0 bottom-5 pl-5 pr-5 text-white w-full";

  return (
    <Link to={to}>
      {src ? (
        <div
          className={containerClasses}
          style={{
            backgroundImage: `url(${imageBlobUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            width: "100%",
            minHeight: 600,
          }}
          onLoad={handleImageLoad}
        >
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
                className="font-bold text-[0.9rem] md:text-[1.3rem]"
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
      ) : (
        <ImageDefaultView>
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
                className="font-bold text-[0.9rem] md:text-[1.3rem]"
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
        </ImageDefaultView>
      )}
    </Link>
  );
}
