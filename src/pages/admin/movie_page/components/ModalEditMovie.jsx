import { Col, DatePicker, Form, Input, Modal, Row, Switch } from "antd";
import { useContext, useEffect, useState } from "react";
import MovieContext from "../MovieContext";
import Config from "../../../../config";
import moment from "moment";
import { addDocument } from "../../../../services/firebaseService";

function ModalEditMovie() {
  const { isModalEdit, setIsModalEdit, loadMovie, dataMovie } =
    useContext(MovieContext);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (dataMovie) {
      dataMovie.updateAt = moment(dataMovie, Config.dateFormat);
      form.setFieldsValue(dataMovie);
    }
  }, [dataMovie.id]);

  return (
    <Modal
      title={
        <span>
          Sửa phim{" "}
          <span className="text-[#4096ff]">[{dataMovie.nameMovie}]</span>
        </span>
      }
      open={isModalEdit}
      onCancel={() => setIsModalEdit(false)}
      width={1024}
      confirmLoading={isLoading}
    >
      <Form
        form={form}
        onFinish={(values) => {
          setIsLoading(true);
          values.updateAt = moment(values.updateAt).format(Config.dateFormat);
          addDocument("movie", values)
            .then(() => {
              loadMovie();
              setIsLoading(false);
            })
            .finally(() => setIsModalEdit(false));
        }}
      >
        <Row gutter={[12, 12]}>
          <Col span={12}>
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
          <Col span={12}>
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
export default ModalEditMovie;
