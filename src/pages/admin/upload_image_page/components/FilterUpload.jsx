import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { useContext } from "react";
import { SelectManga } from "../../../../components";
import UploadImageContext from "../UploadImageContext";

function FilterUpload() {
  const context = useContext(UploadImageContext);
  const { setFilter } = context;
  return (
    <Card className="mb-1">
      <Space>
        <SelectManga />
        <Button
          type="primary"
          ghost
          icon={<SearchOutlined />}
          onClick={() => {}}
        >
          Tìm kiếm
        </Button>
      </Space>
    </Card>
  );
}
export default FilterUpload;
