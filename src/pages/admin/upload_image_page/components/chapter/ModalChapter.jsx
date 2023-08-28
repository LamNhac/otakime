/* eslint-disable react-hooks/exhaustive-deps */
import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Space } from "antd";
import { useContext, useState } from "react";
import { SelectChapter } from "../../../../../components";
import UploadImageContext from "../../UploadImageContext";

import ModalAddChapter from "./ModalAddChapter";
import ModalEditChapter from "./ModalEditChapter";
import TableChapter from "./TableChapter";

function ModalChapter() {
  const context = useContext(UploadImageContext);

  const [filterChapter, setFilterChapter] = useState(null);

  const {
    isModalChapter,
    setIsModalChapter,
    setIsModalAddChapter,
    dataMangaObj,
    loadMangaChapter,
  } = context;

  return (
    <Modal
      open={isModalChapter}
      title={
        <span>
          Upload chapter {""}
          <span className="text-[#1677ff]">[{dataMangaObj.nameManga}]</span>
        </span>
      }
      onCancel={() => setIsModalChapter(false)}
      width={1024}
    >
      <Card>
        <Space>
          <SelectChapter
            dataChapter={dataMangaObj}
            onChange={setFilterChapter}
          />
          <Button
            type="primary"
            ghost
            icon={<SearchOutlined />}
            onClick={() => {
              loadMangaChapter(dataMangaObj, filterChapter); // Pass the filterChapter
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            type="primary"
            ghost
            onClick={() => setIsModalAddChapter(true)}
          >
            Thêm Chapter
          </Button>
        </Space>
      </Card>

      <TableChapter />
      <ModalAddChapter />
      <ModalEditChapter />
    </Modal>
  );
}
export default ModalChapter;
