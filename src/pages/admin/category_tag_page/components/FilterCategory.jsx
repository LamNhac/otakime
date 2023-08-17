import { Button, Card, Input } from "antd";
function FilterCategory(props) {
  const { onChange, onAdd } = props;
  return (
    <Card className="flex gap-2 w-full">
      <Input
        onChange={onChange}
        placeholder="Tìm kiếm thể loại"
        allowClear
        style={{ width: 500 }}
        className=" mr-2"
      ></Input>

      <Button type="primary" ghost onClick={onAdd}>
        Thêm thể loại
      </Button>
    </Card>
  );
}

export default FilterCategory;
