import { Button, Card, Input, Space } from "antd";
import { SelectStatus } from "../../../../components";
import { useContext } from "react";
import MangaPageContext from "../MangaPageContext";

function FilterManga() {
  const context = useContext(MangaPageContext);
  const { handleStatusChange, setFilter, setIsShowModalAdd } = context;

  return (
    <Card title="Tìm kiếm">
      <Space wrap>
        <Input
          placeholder="Tìm kiếm theo tên Manga"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          style={{ width: 500 }}
          allowClear
          addonBefore="Tìm kiếm"
        />
        <SelectStatus onChange={handleStatusChange} />
        <Button type="primary" ghost onClick={() => setIsShowModalAdd(true)}>
          Thêm manga
        </Button>
      </Space>
    </Card>
  );
}

export default FilterManga;
