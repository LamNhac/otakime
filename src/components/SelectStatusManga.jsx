import { Select } from "antd";
import React, { useState } from "react";

export default function SelectStatusManga(props) {
  const { onChange, ...restProps } = props;
  const [data] = useState([
    {
      label: "Đang cập nhật",
      color: "blue",
      value: 1,
      id: 1,
    },
    {
      label: "Dừng cập nhật",
      color: "orange",
      value: 2,
      id: 2,
    },
    {
      label: "Dừng hoạt động",
      color: "error",
      value: 3,
      id: 3,
    },
    {
      label: "Đã hoàn thành",
      color: "success",
      value: 4,
      id: 4,
    },
  ]);
  const handleSelectChange = (selectedItems) => {
    const selectedLabelsAndValues = data.filter(
      (item) => selectedItems === item.value
    );
    onChange(selectedLabelsAndValues);
  };

  return (
    <Select
      {...restProps}
      allowClear
      style={{ width: "100%" }}
      placeholder="Chọn thể loại"
      // tagRender={tagRender}
      onChange={handleSelectChange}
      options={data}
    ></Select>
  );
}
