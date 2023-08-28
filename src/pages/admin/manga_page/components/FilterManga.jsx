import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { useContext, useState } from "react";
import { SelectManga, SelectStatus } from "../../../../components";
import MangaPageContext from "../MangaPageContext";

function FilterManga() {
  const context = useContext(MangaPageContext);
  const { setFilter, setIsShowModalAdd } = context;
  const [filterManga, setFilterManga] = useState(null);
  const [filterStatus, setFilterStatus] = useState(0);

  return (
    <Card title="Tìm kiếm">
      <Space wrap>
        <SelectManga onChange={setFilterManga} />
        <SelectStatus onChange={setFilterStatus} />
        <Button
          type="primary"
          ghost
          icon={<SearchOutlined />}
          onClick={() => {
            setFilter({
              nameManga: filterManga ?? "",
              isStatusManga: filterStatus,
            });
          }}
        >
          Tìm kiếm
        </Button>
        <Button type="primary" ghost onClick={() => setIsShowModalAdd(true)}>
          Thêm manga
        </Button>
      </Space>
    </Card>
  );
}

export default FilterManga;
