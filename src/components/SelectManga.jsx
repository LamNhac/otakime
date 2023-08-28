import { Select } from "antd";
import { useState } from "react";
import { getAllDocuments } from "../services/firebaseService";

function SelectManga(props) {
  const { onChange } = props;
  const [data, setData] = useState([]);
  const handleDropdownVisibleChange = (open) => {
    if (open) {
      var options = [];
      getAllDocuments("manga").then((newData) => {
        for (var i in newData) {
          options.push({
            label: newData[i].nameManga,
            value: newData[i].id,
          });
        }
        setData(options);
      });
    }
  };

  return (
    <Select
      options={data}
      filterOption={(input, option) =>
        option.label.toLowerCase().includes(input.toLowerCase())
      }
      onChange={onChange}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      showSearch
      allowClear
      style={{ width: 300 }}
      placeholder="Tìm kiếm tên truyện..."
    />
  );
}
export default SelectManga;
