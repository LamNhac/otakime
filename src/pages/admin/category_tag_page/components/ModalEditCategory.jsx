/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input, Modal, Tag, theme } from "antd";
import { useEffect, useState } from "react";

function ModalEditCatergory(props) {
  const { isShowModalEdit, data, onOk, onCancel } = props;
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [bgColor, setBgColor] = useState(token.colorPrimary);
  const [textColor, setTextBgColor] = useState(token.colorWhite);

  useEffect(() => {
    if (data && isShowModalEdit) {
      console.log(data);
      form.setFieldsValue(data);
    }
  }, [data, isShowModalEdit]);

  return (
    <Modal
      title={`Sửa thể loại`}
      open={isShowModalEdit}
      onCancel={onCancel}
      onOk={() => form.submit()}
      afterClose={() => {
        form.resetFields();
      }}
      destroyOnClose={true}
      cancelText="Đóng"
      okText="Lưu"
    >
      <Form form={form} onFinish={onOk}>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

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
        <Form.Item name="bgColorCategory" label="Màu nền">
          <Input
            onChange={(e) => setBgColor(e.target.value)}
            addonBefore="#"
            placeholder="Chỉ sử dụng HexColor"
            allowClear
          />
        </Form.Item>
        <Form.Item name="textColorCategory" label="Màu chữ">
          <Input
            onChange={(e) => setTextBgColor(e.target.value)}
            addonBefore="#"
            placeholder="Chỉ sử dụng HexColor"
            allowClear
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
export default ModalEditCatergory;
