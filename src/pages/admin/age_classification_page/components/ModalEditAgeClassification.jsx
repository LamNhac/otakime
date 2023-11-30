import { Card, Col, Form, Input, Modal, Row, message } from "antd";
import React, { useContext, useState } from "react";
import AgeClassificationContext from "../AgeClassificationContext";
import { addDocument } from "../../../../services/firebaseService";

export default function ModalEditAgeClassification() {
  const { isShowModalAdd, setIsShowModalAdd, loadDataTable } = useContext(
    AgeClassificationContext
  );
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();

  const [exampleText, setExampleText] = useState({
    text: "+12",
    textColor: null,
    bgColor: null,
  });

  return (
    <Modal
      title="Thêm phân loại tuổi"
      open={isShowModalAdd}
      onCancel={() => setIsShowModalAdd(false)}
      okText="Thêm"
      cancelText="Đóng"
      onOk={() => form.submit()}
      width={1000}
      confirmLoading={isSubmit}
    >
      <Form
        form={form}
        onFinish={async (values) => {
          setIsSubmit(true);
          console.log("values", values);
          addDocument("age-classification", values)
            .then(() => {
              message.success("Thêm thành công!");
            })
            .finally(() => {
              setIsSubmit(false);
              setIsShowModalAdd(false);
            });
        }}
      >
        <Row gutter={[12, 12]}>
          <Col>
            <Form.Item
              name="nameAgeClassification"
              label="Phân loại tuổi"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input placeholder="" allowClear />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="textColor"
              label="Màu chữ"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input
                placeholder=""
                allowClear
                onChange={(e) => {
                  setExampleText((prev) => ({
                    ...prev,
                    textColor: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="bgColor"
              label="Màu nền"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
              onChange={(e) => {
                setExampleText((prev) => ({
                  ...prev,
                  bgColor: e.target.value,
                }));
              }}
            >
              <Input placeholder="" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <div>
          <Card
            style={{
              width: 80,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              color: exampleText.textColor,
              backgroundColor: exampleText.bgColor,
            }}
          >
            <p className="text-lg font-semibold">{exampleText.text}</p>
          </Card>
        </div>
      </Form>
    </Modal>
  );
}
