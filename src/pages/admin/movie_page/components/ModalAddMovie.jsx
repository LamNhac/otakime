import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  message
} from "antd";
import { useContext, useState } from "react";
import Config from "../../../../config";
import {
  addDocument,
  getAllDocuments,
  saveToLog,
} from "../../../../services/firebaseService";
import MovieContext from "../MovieContext";

import dayjs from "dayjs";
import {
  SelectAgeClassification,
  SelectStatusFilter,
  SelectTag,
} from "../../../../components";

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
        onFinish={async (values) => {
          const movie = await getAllDocuments("movie");
          const movieExist = movie.some(
            (item) => item.urlMovie === values.urlMovie
          );
          if (movieExist) {
            return message.warning(`${values.nameMovie} đã tồn tại`);
          } else {
            setIsLoading(true);
            values.updateAt = dayjs(values.updateAt).format(Config.dateFormat);
            values.ageClassification = values.ageClassification ?? [];
            values.view = 0;

            addDocument("movie", values)
              .then(() => {
                loadMovie();
                message.success(
                  <span>
                    Thêm <b>{values.nameMovie}</b> thành công!
                  </span>
                );
                saveToLog("add", "movie", values);
                setIsLoading(false);
              })
              .finally(() => {
                setIsModalAdd(false);
                form.resetFields();
              });
          }
        }}
        initialValues={{
          isStatusMovie: false,
          updateAt: dayjs(dayjs(), Config.dateFormat),
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
              <Input allowClear readOnly />
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
              label="Ngày tải lên"
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
              name="urlSourceMovie"
              label="URL Source Movie"
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
              <Input allowClear addonAfter="Abyss" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ageClassification"
              label="Phân loại tuổi"
            >
              <SelectAgeClassification
                onChange={(e) => {
                  form.setFieldsValue({
                    ageClassification: e,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="statusMovie"
              label="Tình trạng"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <SelectStatusFilter
                onChange={(e) => {
                  form.setFieldsValue({
                    statusMovie: e,
                  });
                }}
              />
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
