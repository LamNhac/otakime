import React from "react";

export default function ButtonGradient({ children }) {
  return (
    <div className="mx-auto flex  items-center justify-center">
      <div className="h-20 w-full rounded-md  bg-gradient-to-r from-[#ADF709] via-[#F3ADC3] to-[#00CCFF] p-1">
        <div className="flex h-full w-full items-center justify-center  bg-white">
          <div className="flex flex-col gap-2 items-center font-black">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
