import { Select } from "antd";

function SelectStatus(props) {
  const { className, onChange, ...restProps } = props;
  const data = [
    {
      label: "Tất cả",
      value: 0,
    },
    {
      label: "Hoạt động",
      value: 1,
    },
    {
      label: "Ngừng hoạt động",
      value: 2,
    },
  ];
  const handleChange = (value) => {
    onChange(value);
  };
  return (
    <Select
      {...restProps}
      className={className}
      style={{ width: 300 }}
      defaultActiveFirstOption={true}
      defaultValue={data[0]}
      placeholder="Chọn trạng thái hoạt động..."
      // tagRender={tagRender}
      onChange={handleChange}
      options={data}
    ></Select>
  );
}
export default SelectStatus;
