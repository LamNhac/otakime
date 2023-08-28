import { UploadOutlined } from "@ant-design/icons";
import { Button, Image, Space, Table } from "antd";
import { useContext } from "react";
import UploadImageContext from "../UploadImageContext";

function TableUploadImage() {
  const context = useContext(UploadImageContext);
  const {
    dataTable,
    isLoadingTable,
    setIsModalChapter,
    setIsModalImage,
    setDataImage,
    loadMangaChapter,
    loadManga,
    setDataMangaObj,
  } = context;

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên manga",
      dataIndex: "nameManga",
    },

    {
      title: "imgMain",
      dataIndex: "imgMain",
      render: (text, record, index) => <Image src={text} />,
    },
    {
      title: "imgCover",
      dataIndex: "imgCover",
      render: (text, record, index) => <Image src={text} />,
    },
    {
      title: "Thao tác",
      align: "right",
      render: (text, record, index) => {
        return (
          <Space wrap>
            <Button
              onClick={() => {
                loadMangaChapter(record);
                setDataMangaObj(record);
                setIsModalChapter(true);
              }}
              icon={<UploadOutlined />}
            >
              Chapter
            </Button>
            <Button
              onClick={() => {
                setIsModalImage(true);
                loadManga(record);
                setDataImage(record);
              }}
              icon={<UploadOutlined />}
            >
              Ảnh bìa
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={dataTable}
      columns={columns}
      loading={isLoadingTable}
      rowKey="id"
    />
  );
}
export default TableUploadImage;
