import { FolderAddOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { useContext } from "react";
import { SelectMovie, SelectStatus } from "../../../../components";
import MovieContext from "../MovieContext";

function FilterMovie() {
  const { setIsModalAdd } = useContext(MovieContext);
  return (
    <Card>
      <Space size="small">
        <SelectMovie
          onChange={(e) => {
            console.log(e);
          }}
        />
        <SelectStatus
          onChange={(e) => {
            console.log(e);
          }}
        />
        <Button type="primary" ghost icon={<SearchOutlined />}>
          Tìm kiếm
        </Button>

        <Button
          type="primary"
          ghost
          icon={<FolderAddOutlined />}
          onClick={() => setIsModalAdd(true)}
        >
          Thêm movie
        </Button>
      </Space>
    </Card>
  );
}
export default FilterMovie;
