/* eslint-disable react-hooks/exhaustive-deps */
import { Image } from "antd";
import React, { useEffect, useState } from "react";
import ImageDefault from "../assets/images/image_default.jpg";
import ImageDefaultView from "./ImageDefaultView";
const ViewImage = ({ style, src, ...restProps }) => {
  const [imageBlobUrl, setImageBlobUrl] = useState(src);

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
  const handleImageLoad = () => {
    URL.revokeObjectURL(imageBlobUrl);
  };

  if (!src) {
    return <ImageDefaultView height={"h-[400px]"} />;
  }

  return (
    <Image
      {...restProps}
      preview={false}
      src={imageBlobUrl}
      fallback={ImageDefault}
      onLoad={handleImageLoad}
      style={{
        ...style,
      }}
      // placeholder={<Image preview={false} src={ImageDefault} />}
      onError={(e) => {
        console.log("Ảnh bị lỗi...");
      }}
    />
  );
};

export default ViewImage;
