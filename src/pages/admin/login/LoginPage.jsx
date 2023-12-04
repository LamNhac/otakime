import { Button, Card, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../../services/firebase";

function LoginPage() {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values) => {
    setIsLoading(true);
    signInUser(
      values.USERNAME,
      values.PASSWORD,
      () => {
        setIsLoading(false);
        localStorage.setItem("username", values.USERNAME);
        localStorage.setItem("password", values.PASSWORD);

        navigate("/admin/dashboard");
      },
      (error) => {
        if (error) {
          message.error("Tài khoản mật khẩu không chính xác");
          console.log("error", error);
          setIsLoading(false);
        }
      }
    );
    setIsLoading(false);
  };
  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (username && password) {
      console.log("xxx");
      form.setFieldValue("USERNAME", username);
      form.setFieldValue("PASSWORD", password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Card className="  h-auto ">
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="USERNAME" label="Tài khoản">
            <Input allowClear></Input>
          </Form.Item>
          <Form.Item name="PASSWORD" label="Mật khẩu">
            <Input allowClear onPressEnter={() => form.submit()}></Input>
          </Form.Item>
          <div className="w-[100%] flex justify-end">
            <Button onClick={() => form.submit()} loading={isLoading}>
              Đăng nhập
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
export default LoginPage;
