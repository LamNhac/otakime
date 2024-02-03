import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Modal, Space, Table, Tag } from "antd";
import { useContext } from "react";
import { deleteDocument } from "../../../../services/firebaseService";
import MangaPageContext from "../MangaPageContext";
import { blue } from "@ant-design/colors";

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
        return index + 1;
      },
    },
    {
      key: "nameManga",
      dataIndex: "nameManga",
      title: "Tên manga",
      align: "center",
      render: (text, record, index) => {
        return (
          <div className="flex flex-col items-start text-left">
            <h2 class={`text-[${blue.primary}] font-bold`}>
              {record.nameManga}
            </h2>
            <p>Vie: {record.nameMangaVie}</p>
            <p class="italic">Other name: {record.otherName}</p>
          </div>
        );
      },
    },
    {
      key: "author",
      dataIndex: "author",
      title: "Tác giả",
      align: "center",
    },
    {
      key: "updateAt",
      dataIndex: "updateAt",
      title: "Ngày cập nhật",
      align: "center",
    },
    {
      key: "statusManga",
      dataIndex: "statusManga",
      title: "Trạng thái",
      align: "center",
      render: (text, record, index) => {
        const item = text[0];
        return <Tag color={item?.color}>{item?.label}</Tag>;
      },
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
