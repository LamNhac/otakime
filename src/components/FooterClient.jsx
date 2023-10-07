import { Image, Layout } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMAGES from "../constants/images";
const { Footer } = Layout;
function FooterClient() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Tạo một hàm xử lý sự kiện thay đổi kích thước màn hình
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Đăng ký sự kiện thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Lấy kích thước màn hình ban đầu khi component được tạo
    setWindowWidth(window.innerWidth);

    // Hủy đăng ký sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Footer
      className="flex justify-center gap-20"
      style={{ textAlign: "center" }}
    >
      {windowWidth < 640 ? (
        <div className="flex flex-col">
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
        </div>
      ) : (
        <>
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
        </>
      )}
    </Footer>
  );
}
export default FooterClient;
