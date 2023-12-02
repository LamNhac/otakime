import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
import React, { Fragment, useState } from "react";
import { deleteAllDocuments } from "../../../services/firebaseService";
export default function QueryPage() {
  const [isCheckPermission, setIsCheckPermission] = useState(true);
  const [form] = Form.useForm();
  const [selectCollection] = useState([
    {
      value: "manga",
      label: "Manga",
    },
    {
      value: "movie",
      label: "Movie",
    },
    {
      value: "log",
      label: "Log",
    },
    {
      value: "age-classification",
      label: "Age Classification",
    },
    {
      value: "tag",
      label: "Tag",
    },
  ]);
  const [selectedCollection, setSelectedCollection] = useState(null);

  return (
    <div>
      {isCheckPermission ? (
        <Fragment>
          <Card>
            <Row gutter={[12, 12]}>
              <Col>
                <Select
                  options={selectCollection}
                  onChange={(e) => {
                    setSelectedCollection(e);
                  }}
                  className="w-[200px]"
                ></Select>
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    if (selectedCollection) {
                      deleteAllDocuments(selectedCollection).then(() =>
                        message.success("Xóa thành công")
                      );
                      console.log("xx", selectedCollection);
                    }
                  }}
                >
                  Delete all collection
                </Button>
              </Col>
            </Row>
          </Card>
        </Fragment>
      ) : (
        <Fragment>
          <Card>
            <Form
              form={form}
              onFinish={(values) => {
                if (
                  values.username === "admin" &&
                  values.password === "admin"
                ) {
                  setIsCheckPermission(true);
                }
              }}
            >
              <Form.Item name="username" label="username">
                <Input />
              </Form.Item>
              <Form.Item name="password" label="password">
                <Input />
              </Form.Item>
              <Button
                onClick={() => {
                  form.submit();
                }}
              >
                Login
              </Button>
            </Form>
          </Card>
        </Fragment>
      )}
    </div>
  );
}
