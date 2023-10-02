import { Layout, Image } from "antd";
import IMAGES from "../constants/images";
import { Link } from "react-router-dom";
const { Footer } = Layout;
function FooterClient() {
  return (
    <Footer
      className="flex justify-center gap-20"
      style={{ textAlign: "center" }}
    >
      <Image
        src={IMAGES.logo}
        style={{ width: 200, height: "100%" }}
        preview={false}
      />
      <div>
        <div className="flex gap-5">
          <Link to="/termsofuse">
            <p className="underline"> Điều khoản sử dụng</p>
          </Link>
          <Link to="/license">
            <p className="underline">Bản quyền</p>
          </Link>
        </div>

        <p>Email us: mail.otakime@gmail.com</p>
        <p>© Copyright 2023 Otakime</p>
      </div>
    </Footer>
  );
}
export default FooterClient;
