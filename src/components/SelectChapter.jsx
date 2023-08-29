/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "antd";
import { useState } from "react";
import { getAllDocuments } from "../services/firebaseService";
function SelectChapter(props) {
  const { onChange, dataChapter, ...restProps } = props;
  const [data, setData] = useState([]);

  const handleDropdownVisibleChange = (open) => {
    if (open) {
      var options = [];
      getAllDocuments(`manga/${dataChapter.id}/chapter`).then((newData) => {
        for (var i in newData) {
          options.push({
            label: `Chapter ${newData[i].nameChapter
              .toString()
              .padStart(2, "0")}`,
            value: newData[i].id,
          });
        }
        setData(options);
      });
    }
  };

  return (
    <Select
      className="w-96"
      {...restProps}
      onChange={onChange}
      placeholder="Chọn chapter..."
      allowClear
      showSearch
      filterOption={(input, option) =>
        option.label.toLowerCase().includes(input.toLowerCase())
      }
      options={data}
      onDropdownVisibleChange={handleDropdownVisibleChange}
    ></Select>
  );
}
export default SelectChapter;