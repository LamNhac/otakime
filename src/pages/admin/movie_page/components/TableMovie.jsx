/* eslint-disable array-callback-return */
import { blue } from "@ant-design/colors";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  DesktopOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Table, Tag } from "antd";
import { useContext } from "react";
import {
  deleteDocument,
  saveToLog,
} from "../../../../services/firebaseService";
import MovieContext from "../MovieContext";

function TableMovie() {
  const { dataTable, isLoadingTable, setIsModalEdit, loadMovie, loadMovieId } =
    useContext(MovieContext);
  const columns = [
    {
      dataIndex: "id",
      title: "STT",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      dataIndex: "Movie",
      title: "Movie",
      render: (text, record, index) => {
        return (
          <div className="flex flex-col items-start text-left">
            <h2 className={`text-[${blue.primary}] font-bold`}>
              {record.nameMovie}
            </h2>
            <p>Vie: {record.nameMovieVie}</p>
            <p className="italic">Other name: {record.otherName}</p>
          </div>
        );
      },
    },
    {
      dataIndex: "ThongTinPhim",
      title: "Thông tin phim",
      render: (text, record, index) => {
        return (
          <div>
            <p>Đạo diễn: {record.director}</p>
            <p>Studio: {record.studio}</p>
            <p>Biên kịch: {record.writer}</p>
          </div>
        );
      },
    },
    {
      dataIndex: "updateAt",
      title: "Ngày tải lên",
    },
    {
      dataIndex: "statusMovie",
      align: "center",
      title: "Trạng thái",
      render: (text, record, index) => {
        const item = text[0];
        return <Tag color={item?.color}>{item?.label}</Tag>;
      },
    },
    {
      dataIndex: "tags",
      title: "Thể loại",
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
      dataIndex: "thaotac",
      title: "Thao tác",
      align: "right",
      render: (text, record, index) => {
        return (
          <Space size="small">
            <Button
              type="link"
              size="small"
              icon={<DesktopOutlined />}
              target="_blank"
              href={`${window.location.origin}/movie/${record.urlMovie}`}
            >
              Movie
            </Button>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                loadMovieId(record);
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
                    saveToLog("delete", "movie", record);
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
  console.log("dataTable", dataTable);
  return (
    <Table
      dataSource={dataTable}
      columns={columns}
      loading={isLoadingTable}
      rowKey="id"
    />
  );
}
export default TableMovie;
