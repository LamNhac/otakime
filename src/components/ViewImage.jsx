/* eslint-disable react-hooks/exhaustive-deps */
import { Image } from "antd";
import React, { useEffect, useState } from "react";

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
  return (
    <Image
      {...restProps}
      preview={false}
      src={imageBlobUrl}
      onLoad={handleImageLoad}
      style={style}
    />
  );
};

export default ViewImage;
