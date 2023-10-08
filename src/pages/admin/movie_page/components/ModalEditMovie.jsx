/* eslint-disable react-hooks/exhaustive-deps */
import { Col, DatePicker, Form, Input, Modal, Row, Spin, Switch } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { SelectTag } from "../../../../components";
import Config from "../../../../config";
import {
  getDocument,
  updateDocument,
} from "../../../../services/firebaseService";
import MovieContext from "../MovieContext";

function ModalEditMovie() {
  const { isModalEdit, setIsModalEdit, loadMovie, dataMovie } =
    useContext(MovieContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataMovie.id && isModalEdit) {
      setIsLoadingForm(true);
      getDocument("movie", dataMovie.id)
        .then(() => {
          dataMovie.updateAt = dayjs(dataMovie.updateAt, Config.dateFormat);
          form.setFieldsValue(dataMovie);
        })
        .finally(() => setIsLoadingForm(false));
    }
  }, [dataMovie.id, isModalEdit]);

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
      onOk={() => form.submit()}
      width={1024}
      confirmLoading={isLoading}
    >
      <Spin spinning={isLoadingForm} tip="Đang tải dữ liệu">
        <Form
          form={form}
          onFinish={(values) => {
            setIsLoading(true);
            values.updateAt = dayjs(values.updateAt).format(Config.dateFormat);
            updateDocument("movie", dataMovie.id, values)
              .then(() => {
                loadMovie();
                setIsLoading(false);
              })
              .finally(() => {
                setIsModalEdit(false);
                form.resetFields();
              });
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
                <Input
                  allowClear
                  onChange={(e) => {
                    const inputText = e.target.value;
                    const formattedText = inputText
                      .toLowerCase()
                      .replace(/[^a-z0-9\s]/g, "") // Loại bỏ ký tự đặc biệt
                      .replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang
                    form.setFieldsValue({
                      urlMovie: formattedText,
                    });
                  }}
                />
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
            <Col flex="auto">
              <Form.Item
                name="urlMovie"
                label="URL Movie"
                required
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ${label}",
                  },
                ]}
              >
                <Input readOnly />
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
      </Spin>
    </Modal>
  );
}
export default ModalEditMovie;
