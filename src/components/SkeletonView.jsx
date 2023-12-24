import { Skeleton } from "antd";
import React from "react";

export default function SkeletonView(props) {
  const { isLoading = true } = props;
  return <Skeleton active></Skeleton>;
}
