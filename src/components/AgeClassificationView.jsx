import React from "react";

export default function AgeClassificationView({ ageClassification }) {
  return (
    <div
      className=" absolute w-12 h-12 flex items-center justify-center right-[1rem] top-[1rem] rounded-sm"
      style={{
        zIndex: 2,
        backgroundColor: ageClassification?.bgColor,
        color: ageClassification?.textColor,
      }}
    >
      <p className="font-thin text-sm mb-0">{ageClassification?.label}</p>
    </div>
  );
}
