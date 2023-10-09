import { Card, Table, Tag } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Config from "../../../config";
import { getAllDocuments } from "../../../services/firebaseService";
function HistoryPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments("log")
      .then((res) => {
        const sortedData = res.sort((a, b) => {
          const dateA = dayjs(a.dateUpdate, Config.dateTimeFormat);
          const dateB = dayjs(b.dateUpdate, Config.dateTimeFormat);
          return dateB - dateA;
        });
        setData(sortedData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <Card>Filter</Card>
      <Table dataSource={data} loading={isLoading} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="STT"
          render={(text, record, index) => index + 1}
        ></Table.Column>
        <Table.Column
          dataIndex="name"
          title="name"
          render={(text, record, index) => {
            if (record.path === "manga") {
              return record.nameManga;
            }
            if (record.path === "movie") {
              return record.nameMovie;
            }
          }}
        ></Table.Column>
        <Table.Column dataIndex="dateUpdate" title="dateUpdate"></Table.Column>
        <Table.Column
          dataIndex="method"
          title="method"
          render={(text, record, index) => {
            switch (text) {
              case "add":
                return <Tag color="green">ADD</Tag>;
              case "update":
                return <Tag color="blue">UPDATE</Tag>;
              case "delete":
                return <Tag color="red">DELETE</Tag>;
              default:
                return <Tag>UNKNOW</Tag>;
            }
          }}
        ></Table.Column>
      </Table>
    </div>
  );
}
export default HistoryPage;
