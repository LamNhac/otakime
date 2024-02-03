import { BsFillImageFill } from "react-icons/bs";
import React from "react";

export default function ImageDefaultView(props) {
  const { height = "h-full", children } = props;
  return (
    <div
      className={`relative bg-[#dadada] w-full ${height} p-10 rounded-md flex items-center justify-center`}
    >
      <BsFillImageFill style={{ fontSize: 60 }} />
      {children}
    </div>
  );
}
