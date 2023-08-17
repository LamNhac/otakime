import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, message } from "antd";
import { useContext } from "react";
import {
  getDocument,
  updateDocument,
} from "../../../../services/firebaseService";
import MangaPageContext from "../MangaPageContext";

function TableDetailUploadManga() {
  const context = useContext(MangaPageContext);

  const { dataUpload, isLoadingDetailTableUpload, loadChapterManga } = context;

  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "#",
      align: "center",
      render: (text, record, index) => {
        // return index + 1;
        return index + 1;
      },
    },
    {
      title: "Tên chapter",
      dataIndex: "nameChapter",
      key: "nameChapter",
      align: "center",
      render: (text, record, index) => {
        return "Chapter " + text;
      },
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "updateChapterAt",
      key: "updateChapterAt",
      align: "center",
    },
    {
      title: "Tổng số lượng ảnh",
      dataIndex: "imgChapterUrl",
      key: "nameChapter",
      align: "center",

      render: (text, record, index) => text.length,
    },
    {
      title: "Thao tác",
      dataIndex: "thaotac",
      key: "thaotac",
      align: "right",
      render: (text, record, index) => {
        return (
          <Space size="small">
            <Button type="link" icon={<EditOutlined />}>
              Sửa
            </Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: "Chapter " + record.nameChapter,
                  content: `Bạn có chắc xóa Chapter ${record.nameChapter} không?`,
                  cancelText: "Đóng",
                  onOk: async () => {
                    let _data = await getDocument("manga", dataUpload.id);
                    let _dataChapter = _data.chapter;
                    let updateData = [];
                    for (var i in _dataChapter) {
                      if (_dataChapter[i].id !== record.id) {
                        updateData.push(_dataChapter[i]);
                      }
                    }
                    //Sắp xếp theo thứ tự tăng dần theo nameChapter
                    updateData.sort(
                      (a, b) =>
                        parseInt(a.nameChapter) - parseInt(b.nameChapter)
                    );

                    updateDocument("manga", dataUpload.id, {
                      chapter: updateData,
                    }).then(() => {
                      loadChapterManga(dataUpload.id);
                      message.success(
                        <span>
                          Xóa <b>Chapter{record.nameChapter}</b>thành công!
                        </span>
                      );
                    });
                  },
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
  console.log(dataUpload.chapter);
  return (
    <Table
      dataSource={dataUpload.chapter}
      columns={columns}
      rowKey="id"
      loading={isLoadingDetailTableUpload}
    />
  );
}
export default TableDetailUploadManga;
