import { Button, Card, Form, Input } from "antd";
import { useState } from "react";

function LoginPage() {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    setIsLoading(true);
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Card className="  h-auto ">
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="USERNAME"
            label="Tài khoản"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
            required
          >
            <Input allowClear></Input>
          </Form.Item>
          <Form.Item
            name="PASSWORD"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            required
          >
            <Input allowClear onPressEnter={() => form.submit()}></Input>
          </Form.Item>
        </Form>
        <Button onClick={() => form.submit()} loading={isLoading}>
          Đăng nhập
        </Button>
      </Card>
    </div>
  );
}
export default LoginPage;
