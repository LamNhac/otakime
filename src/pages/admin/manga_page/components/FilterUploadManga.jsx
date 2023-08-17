import { Button, Col, Row } from "antd";
import SelectChapter from "../../../../components/SelectChapter";
import { useContext } from "react";
import MangaPageContext from "../MangaPageContext";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

function FilterUploadManga() {
  const context = useContext(MangaPageContext);
  const {
    dataChapter,
    setValueSelectChapter,
    valueSelectChapter,
    setIsShowModalAddDetailUpload,
    setFilterChapter,
  } = context;
  const handleSearch = () => {
    setFilterChapter(valueSelectChapter); // Xóa bộ lọc nếu không có giá trị chương đã chọn
  };
  return (
    <Row gutter={[12, 12]} className="mb-1">
      <Col>
        <SelectChapter
          dataChapter={dataChapter}
          onChange={(e) => {
            setValueSelectChapter(e);
          }}
        />
      </Col>
      <Col>
        <Button
          type="primary"
          ghost
          onClick={handleSearch}
          icon={<SearchOutlined />}
        >
          Tìm kiếm
        </Button>
      </Col>
      <Col>
        <Button
          type="primary"
          ghost
          onClick={() => {
            setIsShowModalAddDetailUpload(true);
          }}
          icon={<PlusCircleOutlined />}
        >
          Thêm Chapter
        </Button>
      </Col>
    </Row>
  );
}
export default FilterUploadManga;
