import { Select } from "antd";
import React, { useState } from "react";
import { getAllDocuments } from "../services/firebaseService";
export default function SelectAgeClassification(props) {
  const { onChange, ...restProps } = props;
  const [data, setData] = useState([]);

  const handleDropdownVisibleChange = (open) => {
    if (open) {
      var options = [];
      getAllDocuments("age-classification").then((newData) => {
        for (var i in newData) {
          options.push({
            label: newData[i].nameAgeClassification,
            value: newData[i].id,
            id: newData[i].id,
          });
        }
        setData(options);
      });
    }
  };
  const handleSelectChange = (selectedItems) => {
    const selectedLabelsAndValues = data.filter((item) =>
      selectedItems.includes(item.value)
    );
    onChange(selectedLabelsAndValues);
  };
  return (
    <Select
      {...restProps}
      options={data}
      filterOption={(input, option) =>
        option.label.toLowerCase().includes(input.toLowerCase())
      }
      onChange={handleSelectChange}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      showSearch
      allowClear
      style={{ width: 300 }}
      placeholder="Tìm kiếm phân loại tuổi..."
    />
  );
}
