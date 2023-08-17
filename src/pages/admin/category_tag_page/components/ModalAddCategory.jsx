import { Form, Input, Modal, Tag, theme } from "antd";
import { useState } from "react";

function ModalAddCategory(props) {
  const { isShowModalAdd, onCancel, onOK } = props;
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [bgColor, setBgColor] = useState(token.colorPrimary);
  const [textColor, setTextBgColor] = useState(token.colorWhite);
  return (
    <Modal
      title="Thêm thể loại"
      open={isShowModalAdd}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Lưu"
      cancelText="Đóng"
    >
      <Form form={form} onFinish={onOK}>
        <Form.Item
          name="nameCategory"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên thể loại",
            },
          ]}
          label="Tên thể loại"
        >
          <Input placeholder="Tên thể loại" allowClear></Input>
        </Form.Item>
        <Form.Item name="bgColorCategory" label="Màu thể loại">
          <Input
            onChange={(e) => setBgColor(e.target.value)}
            addonBefore="#"
            placeholder="Chỉ sử dụng HexColor"
          />
        </Form.Item>
        <Form.Item name="textColorCategory" label="Màu nền thể loại">
          <Input
            onChange={(e) => setTextBgColor(e.target.value)}
            addonBefore="#"
            placeholder="Chỉ sử dụng HexColor"
          />
        </Form.Item>

        <Tag
          type="primary"
          style={{ backgroundColor: `#${bgColor}`, color: `#${textColor}` }}
        >
          {bgColor} {textColor}
        </Tag>
      </Form>
    </Modal>
  );
}
export default ModalAddCategory;
