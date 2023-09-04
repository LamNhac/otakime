/* eslint-disable react-hooks/exhaustive-deps */
import { Col, DatePicker, Form, Input, Modal, Row, Switch } from "antd";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { SelectTag } from "../../../../components";
import Config from "../../../../config";
import { updateDocument } from "../../../../services/firebaseService";
import MovieContext from "../MovieContext";

function ModalEditMovie() {
  const { isModalEdit, setIsModalEdit, loadMovie, dataMovie } =
    useContext(MovieContext);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(dataMovie).length !== 0) {
      dataMovie.updateAt = moment(dataMovie.updateAt, Config.dateFormat);

      form.setFieldsValue(dataMovie);
    }
  }, [dataMovie.id]);

  console.log(dataMovie);
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
          values.isStatusMovie =
            values.isStatusMovie === undefined ? false : true;
          updateDocument("movie", dataMovie.id, values)
            .then(() => {
              loadMovie();
              setIsLoading(false);
            })
            .finally(() => setIsModalEdit(false));
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
export default ModalEditMovie;
