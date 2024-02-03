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
      align: "center",
    },
    {
      title: "Tên Movie",
      dataIndex: "nameMovie",
    },

    {
      title: "Ảnh Main",
      dataIndex: "imgMain",
      render: (text, record, index) => <Image src={text} width={100} />,
    },
    {
      title: "Ảnh Cover Desktop",
      dataIndex: "imgCoverDesktop",
      render: (text, record, index) => <Image src={text} width={100} />,
    },
    {
      title: "Ảnh Cover Mobile",
      dataIndex: "imgCoverMobile",
      render: (text, record, index) => <Image src={text} width={100} />,
    },
    {
      title: "Thao tác",
      align: "center",
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
