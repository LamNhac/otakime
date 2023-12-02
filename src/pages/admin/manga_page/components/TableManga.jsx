import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  RetweetOutlined,
} from "@ant-design/icons";
import { Button, Modal, Popconfirm, Space, Table, Tag, message } from "antd";
import { useContext } from "react";
import {
  deleteDocument,
  updateDocument,
} from "../../../../services/firebaseService";
import MangaPageContext from "../MangaPageContext";

function TableManga() {
  const context = useContext(MangaPageContext);
  const {
    filteredData,
    isLoadingTable,
    setIsShowModalEdit,
    setDataEdit,
    loadManga,
  } = context;

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
      key: "nameManga",
      dataIndex: "nameManga",
      title: "Tên manga",
      align: "center",
    },
    {
      key: "nameMangaVie",
      dataIndex: "nameMangaVie",
      title: "Tên manga (Việt)",
      align: "center",
    },
    {
      key: "otherName",
      dataIndex: "otherName",
      title: "Tên khác",
      align: "center",
    },
    {
      key: "author",
      dataIndex: "author",
      title: "Tác giả",
      align: "center",
    },
    {
      key: "statusManga",
      dataIndex: "statusManga",
      title: "Trạng thái",
      align: "center",
      render: (text, record, index) => {
        const item = text[0];
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
    {
      key: "updateAt",
      dataIndex: "updateAt",
      title: "Ngày cập nhật",
      align: "center",
      // render: (text, record, index) => {
      //   console.log(text);
      //   return moment(text).format(Config.dateFormat);
      // },
    },
    {
      key: "tags",
      dataIndex: "tags",
      title: "Thể loại",
      align: "center",
      render: (text, record, index) => {
        return (
          <Space wrap size="small">
            {text.map((e, index) => (
              <Tag color="blue" key={index}>
                {e.label}
              </Tag>
            ))}
          </Space>
        );
      },
    },

    {
      key: "description",
      dataIndex: "description",
      title: "Mô tả",
    },

    {
      key: "thaotac",
      dataIndex: "thaotac",
      title: "Thao tác",
      align: "right",
      render: (text, record, index) => {
        return (
          <Space size="small">
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                setIsShowModalEdit(true);
                setDataEdit(record);
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
                  title: record.nameManga,
                  icon: <ExclamationCircleFilled />,
                  content: `Bạn có muốn xóa ${record.nameManga}`,
                  onOk() {
                    deleteDocument("manga", record.id).then(() => loadManga());
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
      size="middle"
      dataSource={filteredData}
      columns={columns}
      loading={isLoadingTable}
      rowKey="id"
    />
  );
}

export default TableManga;
