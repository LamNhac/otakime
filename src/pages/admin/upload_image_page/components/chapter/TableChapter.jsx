import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import { useContext } from "react";
import { deleteDocument } from "../../../../../services/firebaseService";
import UploadImageContext from "../../UploadImageContext";

function TableChapter() {
  const {
    dataChapter,
    isLoadingTableChapter,
    setIsModalEditDetailChapter,
    setDataDetailChapter,
    dataMangaObj,
    loadMangaChapter,
  } = useContext(UploadImageContext);
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Chapter",
      dataIndex: "nameChapter",
      render: (text, record, index) =>
        `Chapter ${text.toString().padStart(2, "0")}`,
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "updateChapterAt",
    },
    {
      title: "Thao tác",
      align: "right",
      render: (text, record, index) => {
        return (
          <Space size="small">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                setDataDetailChapter(record);
                setIsModalEditDetailChapter(true);
              }}
            >
              Sửa
            </Button>
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: `Chapter ${record.nameChapter
                    .toString()
                    .padStart(2, "0")}`,
                  icon: <ExclamationCircleFilled />,
                  content: `Bạn có muốn xóa Chapter ${record.nameChapter
                    .toString()
                    .padStart(2, "0")}?`,
                  onOk() {
                    deleteDocument(
                      `manga/${dataMangaObj.id}/chapter`,
                      record.id
                    ).then(() => loadMangaChapter(dataMangaObj));
                  },
                  okText: "Xóa",
                  cancelText: "Đóng",
                });
              }}
            >
              Xóa
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={dataChapter}
      columns={columns}
      loading={isLoadingTableChapter}
      rowKey="id"
    ></Table>
  );
}
export default TableChapter;
