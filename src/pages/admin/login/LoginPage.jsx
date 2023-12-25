import { Button, Card, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminClaims, signInAdminUser } from "../../../services/firebase";

function LoginPage() {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values) => {
    setIsLoading(true);
    console.log(values);
    signInAdminUser(
      values.USERNAME,
      values.PASSWORD,
      (user) => {
        // setAdminClaims();
        console.log(user);
        navigate("/admin/dashboard");
        setIsLoading(false);
        localStorage.setItem("USERNAME", values.USERNAME);
        localStorage.setItem("PASSWORD", values.PASSWORD);
        localStorage.setItem("accessToken", user.accessToken);
        localStorage.setItem("isLoginAdmin", false);
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
    const isLoginAdmin = localStorage.getItem("isLoginAdmin");
    const accessToken = localStorage.getItem("accessToken");
    if (isLoginAdmin) {
      navigate("/admin/dashboard");
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
