import { Select } from "antd";
import React, { useState } from "react";

export default function SelectFilterStatusMovie(props) {
  const { onChange, ...restProps } = props;
  const [data] = useState([
    {
      label: "Tất cả",
      color: "blue",
      value: 1,
      id: 1,
    },
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
      placeholder="Chọn tình trạng movie..."
      // tagRender={tagRender}
      onChange={handleSelectChange}
      options={data}
    ></Select>
  );
}
