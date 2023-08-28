import { Select } from "antd";
import { useState } from "react";
import { getAllDocuments } from "../services/firebaseService";

function SelectMovie(props) {
  const { onChange } = props;
  const [data, setData] = useState([]);

  const handleDropdownVisibleChange = (open) => {
    if (open) {
      var options = [];
      getAllDocuments("movie").then((newData) => {
        for (var i in newData) {
          options.push({
            label: newData[i].nameMovie,
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
      allowClear
      showSearch
      onSearch={onChange}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onChange={onChange}
      options={data}
      placeholder="Chon movie..."
    />
  );
}
export default SelectMovie;
