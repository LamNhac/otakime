import { Button, Card, Input } from "antd";
import { SelectStatus } from "../../../../components";
import { useContext } from "react";
import MangaPageContext from "../MangaPageContext";

function FilterManga() {
  const context = useContext(MangaPageContext);
  const { handleStatusChange, setFilter, setIsShowModalAdd } = context;

  return (
    <Card>
      <Input
        placeholder="Tìm kiếm theo tên Manga"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        style={{ width: 500 }}
        allowClear
        addonBefore="Tìm kiếm"
        className="mr-2"
      />
      <SelectStatus onChange={handleStatusChange} className="mr-2" />
      <Button type="primary" ghost onClick={() => setIsShowModalAdd(true)}>
        Thêm manga
      </Button>
    </Card>
  );
}

export default FilterManga;
