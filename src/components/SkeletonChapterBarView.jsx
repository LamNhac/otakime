import { Skeleton } from "antd";
import React from "react";

export default function SkeletonChapterBarView() {
  return (
    <div className=" flex  w-full">
      <Skeleton.Avatar active className="w-auto" />
      <Skeleton.Avatar active className="w-auto" />
      <Skeleton.Avatar active className="w-auto" />
      <Skeleton.Input active className="h-[30px]" />
      <Skeleton.Avatar active className="w-auto" />
    </div>
  );
}
