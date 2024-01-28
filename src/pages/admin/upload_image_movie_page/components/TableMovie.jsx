import { UploadOutlined } from "@ant-design/icons";
import { Button, Image, Space, Table } from "antd";
import React, { useContext } from "react";
import UploadImageMovieContext from "../UploadImageMovieContext";

export default function TableMovie() {
  const context = useContext(UploadImageMovieContext);
  const {
    dataTable,
    isLoadingTable,
    setIsModalImage,
    setDataImage,
    loadManga,
  } = context;

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên manga",
      dataIndex: "nameMovie",
    },

    {
      title: "imgMain",
      dataIndex: "imgMain",
      render: (text, record, index) => <Image src={text} width={100} />,
    },
    {
      title: "imgCover",
      dataIndex: "imgCover",
      render: (text, record, index) => <Image src={text} width={100} />,
    },
    {
      title: "Thao tác",
      align: "right",
      render: (text, record, index) => {
        return (
          <Space wrap>
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
