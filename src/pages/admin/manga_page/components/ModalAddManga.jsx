import { Col, DatePicker, Form, Input, Modal, Row, message } from "antd";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { SelectAgeClassification, SelectTag } from "../../../../components";
import SelectStatusManga from "../../../../components/SelectStatusManga";
import Config from "../../../../config";
import {
  addDocument,
  getAllDocuments,
  saveToLog,
} from "../../../../services/firebaseService";
import MangaPageContext from "../MangaPageContext";

function ModalAddManga() {
  const context = useContext(MangaPageContext);
  const { isShowModalAdd, setIsShowModalAdd, loadManga } = context;

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      title="Thêm manga"
      open={isShowModalAdd}
      onCancel={() => setIsShowModalAdd(false)}
      okText="Thêm"
      cancelText="Đóng"
      onOk={() => form.submit()}
      width={1000}
      confirmLoading={isLoading}
    >
      <Form
        form={form}
        onFinish={async (values) => {
          // Lấy danh sách tất cả các manga
          const data = await getAllDocuments("manga");

          // Kiểm tra xem manga đã tồn tại chưa
          const mangaExists = data.some(
            (item) => item.urlManga === values.urlManga
          );

          if (mangaExists) {
            return message.warning(`Đã tồn tại manga ${values.urlManga}`);
          } else {
            setIsLoading(true);
            values.updateAt = dayjs(values.updateAt).format(Config.dateFormat);
            // values.chapter = []; //Tạo trường chapter cho manga
            values.newDateUpdateChapterAt = ""; // Tạo trường newDateUpdateChapterAt để lấy chapter mới cập nhật
            values.newNameChapter = null; // Tạo trường newNameChapter để lấy tên chapter mới nhất
            values.ageClassification = values.ageClassification ?? [];
            console.log(values);
            addDocument(`manga`, values)
              .then((data) => {
                setIsLoading(false);
                message.success(
                  <span>
                    Thêm manga <b>{values.nameManga}</b> thành công!
                  </span>
                );
                loadManga();
              })
              .finally(() => {
                form.resetFields();
                saveToLog("add", "manga", values);
                setIsShowModalAdd(false);
              })
              .catch((error) => message.error(error));
          }
        }}
        initialValues={{
          updateAt: dayjs(dayjs(), Config.dateFormat),
          statusManga: [
            {
              label: "Đang cập nhật",
              color: "blue",
              value: 1,
              id: 1,
            },
          ],
        }}
      >
        <Row align="middle" gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="nameManga"
              label="Tên manga"
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
                  const inputText = e.target.value;
                  const formattedText = inputText
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, "") // Loại bỏ ký tự đặc biệt
                    .replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang
                  form.setFieldsValue({
                    urlManga: formattedText,
                  });
                }}
              ></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nameMangaVie"
              label="Tên manga (Việt)"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input placeholder="" allowClear></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle" gutter={[12, 12]}>
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
              <Input placeholder="" allowClear></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="author"
              label="Tác giả"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input placeholder="" allowClear></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle" gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="tags"
              label="Thể loại"
              required
              rules={[
                {
                  validator: (_, value) => {
                    if (value && value.length > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Vui lòng chọn thể loại");
                  },
                },
              ]}
              validateTrigger={["onChange"]} // Validate on tag selection change
            >
              <SelectTag
                onChange={(e) =>
                  form.setFieldsValue({
                    tags: e,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ageClassification"
              label="Phân loại tuổi"
              validateTrigger={["onChange"]} // Validate on tag selection change
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
          <Col span={12}>
            <Form.Item
              name="updateAt"
              label="Ngày đăng truyện"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <DatePicker
                format={Config.dateFormat}
                className="w-full"
                placeholder="Chọn Ngày đăng truyện"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="urlManga"
              label="URL Manga"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input placeholder="" allowClear readOnly></Input>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="statusManga"
          label="Tình trạng"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ${label}",
            },
          ]}
        >
          <SelectStatusManga
            onChange={(e) => {
              form.setFieldsValue({
                statusManga: e,
              });
            }}
          />
        </Form.Item>
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
          <Input.TextArea rows={3} placeholder="" allowClear></Input.TextArea>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default ModalAddManga;
