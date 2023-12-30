import { Skeleton } from "antd";
import React from "react";

export default function SkeletonImage(props) {
  const { isLoading = true, height = 305, style } = props;
  return (
    <Skeleton.Image
      active={isLoading}
      block
      style={{ height: height, minWidth: "100%", ...style }}
    />
  );
}
