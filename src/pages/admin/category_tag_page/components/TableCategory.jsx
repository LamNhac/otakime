import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
function TableCategory(props) {
  const { dataSource, isLoadingTable, onEdit, onDelete } = props;
  const columns = [
    {
      key: "#",
      dataIndex: "id",
      title: "#",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      key: "tags",
      dataIndex: "nameCategory",
      title: "Tên thể loại",
      align: "center",
    },
    {
      key: "tags",
      dataIndex: "bgColorCategory",
      title: "Màu nền ",
      align: "center",
      render: (text, record, index) => <Tag color={text}>{text}</Tag>,
    },
    {
      key: "tags",
      dataIndex: "textColorCategory",
      title: "Màu chữ ",
      align: "center",
      render: (text, record, index) => <Tag color={text}>{text}</Tag>,
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
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            >
              Sửa
            </Button>
            <Popconfirm
              title={` ${record.nameCategory}`}
              description="Bạn có chắc chắn xóa không?"
              okText="Xóa"
              cancelText="Đóng"
              onConfirm={() => onDelete(record)}
            >
              <Button type="link" icon={<DeleteOutlined />}>
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        size="middle"
        loading={isLoadingTable}
      />

      {/* <ModalAddCategory
        isShowModalAdd={isShowModalAdd}
        onCancel={() => setIsShowModalAdd(false)}
        onOK={(values) => {
          values.id = uuidv4();
          values.bgColorCategory = tinycolor(
            values.bgColorCategory
          ).toHexString();
          values.textColorCategory = tinycolor(
            values.textColorCategory
          ).toHexString();
          createRT("tags", values);
        }}
      />
      <ModalEditCategory
        isShowModalEdit={isShowModalEdit}
        onCancel={() => setIsShowModalAdd(false)}
        onOK={(values) => {}}
      /> */}
    </>
  );
}
export default TableCategory;
