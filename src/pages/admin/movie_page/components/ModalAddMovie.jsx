import { Col, DatePicker, Form, Input, Modal, Row, Switch } from "antd";
import { useContext, useState } from "react";
import MovieContext from "../MovieContext";
import Config from "../../../../config";
import moment from "moment";
import { addDocument } from "../../../../services/firebaseService";

import { SelectTag } from "../../../../components";

function ModalAddMovie() {
  const { isModalAdd, setIsModalAdd, loadMovie } = useContext(MovieContext);

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      title="Thêm phim"
      open={isModalAdd}
      onCancel={() => setIsModalAdd(false)}
      onOk={() => form.submit()}
      width={1024}
      confirmLoading={isLoading}
    >
      <Form
        form={form}
        onFinish={(values) => {
          setIsLoading(true);
          values.updateAt = moment(values.updateAt).format(Config.dateFormat);
          values.isStatusMovie =
            values.isStatusMovie === undefined ? false : true;
          addDocument("movie", values)
            .then(() => {
              loadMovie();
              setIsLoading(false);
            })
            .finally(() => setIsModalAdd(false));
        }}
      >
        <Row gutter={[12, 12]}>
          <Col flex="auto">
            <Form.Item
              name="nameMovie"
              label="Tên phim"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col flex="auto">
            <Form.Item
              name="otherName"
              label="Tên khác"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="director"
              label="Đạo diễn"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="studio"
              label="Studio"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="stars"
              label="Diễn viên"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="writer"
              label="Biên kịch"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="tags"
              label="Thể loại"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <SelectTag />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="updateAt"
              label="Ngày cập nhật"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <DatePicker allowClear format={Config.dateFormat} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="abyssSource"
              label="Abyss"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
                {
                  validator: (rule, value) => {
                    if (value && !/^https:\/\/.*/.test(value)) {
                      return Promise.reject(
                        "Vui lòng nhập URL bắt đầu bằng 'https://'"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="isStatusMovie"
              label="Trạng thái"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col flex="auto">
            <Form.Item
              name="description"
              label="Mô tả"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input.TextArea rows={3} allowClear></Input.TextArea>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
export default ModalAddMovie;
