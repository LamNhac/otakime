import { Skeleton } from "antd";
import React from "react";

export default function SkeletionMovie() {
  return (
    <div className="flex flex-wrap gap-6 w-full">
      <Skeleton.Image
        style={{ minWidth: "100%", height: "100%", minHeight: 300 }}
        active
      />
      <Skeleton active></Skeleton>
    </div>
  );
}
