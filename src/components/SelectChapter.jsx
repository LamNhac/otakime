/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "antd";
import { useEffect, useState } from "react";
// import { isEmpty } from "../utils/func";
function SelectChapter(props) {
  const { onChange, dataChapter, ...restProps } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    if (dataChapter) {
      var options = [];
      dataChapter.forEach((e) => {
        options.push({
          value: e.id,
          label: "Chapter " + e.nameChapter.toString().padStart(2, "0"),
        });
      });
      setData(options);
    }
  }, [dataChapter]);
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
    ></Select>
  );
}
export default SelectChapter;
