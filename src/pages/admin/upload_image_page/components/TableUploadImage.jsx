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
    setDataChapter,
    setDataImage,
  } = context;
  const columns = [
    {
      title: "Tên manga",
      dataIndex: "nameManga",
    },
    {
      title: "Chapter",
      dataIndex: "chapter",
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
      render: (text, record, index) => {
        return (
          <Space wrap>
            <Button
              onClick={() => {
                setIsModalChapter(true);
                setDataChapter(record);
              }}
            >
              Chapter
            </Button>
            <Button
              onClick={() => {
                setIsModalImage(true);
                setDataImage(record);
              }}
            >
              Ảnh bìa
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
export default TableUploadImage;
