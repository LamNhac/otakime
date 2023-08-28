import { Button, Modal, Popconfirm, Space, Table, Tag, message } from "antd";
import { useContext } from "react";
import MovieContext from "../MovieContext";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  RetweetOutlined,
} from "@ant-design/icons";
import {
  deleteDocument,
  updateDocument,
} from "../../../../services/firebaseService";

function TableMovie() {
  const { dataTable, isLoadingTable, setIsModalEdit, setDataMovie, loadMovie } =
    useContext(MovieContext);
  const columns = [
    {
      dataIndex: "#",
      title: "#",
      render: (text, record, index) => index + 1,
    },
    {
      dataIndex: "nameMovie",
      title: "Tên phim",
    },
    {
      dataIndex: "otherName",
      title: "Tên khác",
    },
    {
      dataIndex: "isStatusMovie",
      title: "Trạng thái",
      render: (text, record, index) => {
        return (
          <Tag color={text ? "success" : "red"}>
            {text ? "Hoạt động" : "Ngừng hoạt động"}
          </Tag>
        );
      },
    },

    {
      dataIndex: "director",
      title: "Đạo diễn",
    },
    {
      dataIndex: "stars",
      title: "Diễn viên",
    },
    {
      dataIndex: "studio",
      title: "Studio",
    },
    {
      dataIndex: "writer",
      title: "Biên kịch",
    },
    {
      dataIndex: "description",
      title: "Mô tả",
    },
    {
      dataIndex: "thaotac",
      title: "Thao tác",
      align: "right",
      render: (text, record, index) => {
        return (
          <Space size="small">
            <Popconfirm
              title={record.nameMovie}
              description={
                record.isStatusMovie
                  ? "Bạn có chắc chắn ngừng hoạt động không?"
                  : "Bạn có chắc chắn mở hoạt động không?"
              }
              okText="Cập nhật"
              cancelText="Đóng"
              onConfirm={() => {
                record.isStatusMovie = !record.isStatusMovie;

                updateDocument("movie", record.id, record)
                  .then(() => loadMovie())
                  .then(() =>
                    message.success(
                      <span>
                        Cập nhật trạng thái <b>{record.nameMovie}</b> thành
                        công!
                      </span>
                    )
                  );
              }}
            >
              <Button type="link" icon={<RetweetOutlined />}>
                CN Trạng thái
              </Button>
            </Popconfirm>

            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                setDataMovie(record);
                setIsModalEdit(true);
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
                  title: record.nameMovie,
                  icon: <ExclamationCircleFilled />,
                  content: `Bạn có muốn xóa ${record.nameMovie}`,
                  onOk() {
                    deleteDocument("movie", record.id).then(() => loadMovie());
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
    <Table dataSource={dataTable} columns={columns} loading={isLoadingTable} />
  );
}
export default TableMovie;
