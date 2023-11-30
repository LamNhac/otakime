import { Button, Modal, Space, Table } from "antd";
import React, { useContext } from "react";
import AgeClassificationContext from "../AgeClassificationContext";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { deleteDocument } from "../../../../services/firebaseService";
export default function AgeClassificationTable() {
  const {
    dataFilter,
    isLoadingTable,
    setIsShowModalEdit,
    setDataEdit,
    loadDataTable,
  } = useContext(AgeClassificationContext);
  return (
    <div>
      <Table dataSource={dataFilter} loading={isLoadingTable} rowKey="id">
        <Table.Column
          key="id"
          dataIndex="id"
          title="STT"
          render={(text, record, index) => ++index}
        ></Table.Column>
        <Table.Column
          key=""
          dataIndex="nameAgeClassification"
          title="Phân loại tuổi"
        ></Table.Column>
        <Table.Column
          key=""
          dataIndex="textColor"
          title="Màu chữ"
        ></Table.Column>
        <Table.Column key="" dataIndex="bgColor" title="Màu nền"></Table.Column>
        <Table.Column
          key=""
          dataIndex=""
          title="Thao tác"
          render={(text, record, index) => {
            return (
              <Space>
                <Button
                  onClick={() => {
                    setDataEdit(record);
                    setIsShowModalEdit(true);
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
                      title: record.nameAgeClassification,
                      icon: <ExclamationCircleFilled />,
                      content: `Bạn có muốn xóa phân loại ${record.nameAgeClassification} không?`,
                      onOk() {
                        deleteDocument("age-classification", record.id).then(
                          () => loadDataTable()
                        );
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
          }}
        ></Table.Column>
      </Table>
    </div>
  );
}
