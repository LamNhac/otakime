import { Skeleton } from "antd";
import React from "react";

export default function SkeletionMovie() {
  return (
    <div className="flex gap-6 w-full">
      <Skeleton.Image style={{ minWidth: "100%", height: "100%" }} active />
      <Skeleton active></Skeleton>
    </div>
  );
}
