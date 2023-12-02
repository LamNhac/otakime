import { Select } from "antd";
import { useEffect, useState } from "react";

import { getAllDocuments } from "../services/firebaseService";

function SelectTag(props) {
  const { onChange, ...restProps } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllDocuments("tag").then((data) => {
      let options = [];
      for (let i = 0; i < data.length; i++) {
        options.push({
          label: data[i].nameCategory,
          value: data[i].id,
          id: data[i].id,
        });
      }
      setData(options);
    });
  }, []);
  const handleSelectChange = (selectedItems) => {
    console.log("selectedItems", selectedItems);
    const selectedLabelsAndValues = data.filter((item) =>
      selectedItems.includes(item.value)
    );
    onChange(selectedLabelsAndValues);
  };
  return (
    <Select
      {...restProps}
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Chọn thể loại"
      // tagRender={tagRender}
      onChange={handleSelectChange}
      options={data}
    ></Select>
  );
}
export default SelectTag;
