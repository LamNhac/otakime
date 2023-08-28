import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Switch,
  message
} from "antd";
import moment from "moment/moment";
import { useContext, useState } from "react";
import { SelectTag } from "../../../../components";
import Config from "../../../../config";
import { addDocument } from "../../../../services/firebaseService";
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
      okText="Lưu"
      cancelText="Đóng"
      onOk={() => form.submit()}
      width={1000}
      confirmLoading={isLoading}
    >
      <Form
        form={form}
        onFinish={async (values) => {
          setIsLoading(true);
          values.updateAt = moment(values.updateAt).format(Config.dateFormat);

          values.chapter = []; //Tạo trường chapter cho manga
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
            .finally(() => setIsShowModalAdd(false));
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
              <Input placeholder="" allowClear></Input>
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
              <DatePicker
                format={Config.dateFormat}
                className="w-full"
                placeholder="Chọn ngày cập nhật"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="isStatusManga"
          label="Trạng thái"
          valuePropName="checked"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ${label}",
            },
          ]}
        >
          <Switch
            unCheckedChildren="Không hoạt động"
            checkedChildren="Hoạt động"
          ></Switch>
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
