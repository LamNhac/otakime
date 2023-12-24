import { Skeleton } from "antd";
import React from "react";

export default function SkeletonViewChapter(props) {
  const { isLoading = true } = props;
  return <Skeleton.Input active={isLoading} />;
}
