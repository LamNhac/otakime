import { Col, Layout, Row } from "antd";
import { Link } from "react-router-dom";
import ViewImage from "./ViewImage";
const { Footer } = Layout;
function FooterClient({ email, logo }) {
  return (
    <Footer className="text-center">
      <Row gutter={[12, 12]} align="middle" justify="center">
        <Col>
          <ViewImage src={logo} style={{ width: 200, height: "100%" }} />
        </Col>
        <Col>
          <div className="flex flex-col items-center">
            <div>
              <div className="flex gap-5">
                <Link to="/termsofuse">
                  <p className="underline"> Điều khoản sử dụng</p>
                </Link>
                <Link to="/license">
                  <p className="underline">Bản quyền</p>
                </Link>
              </div>

              <p>Email us: {email}</p>
              <p>© Copyright 2023 Otakime</p>
            </div>
          </div>
        </Col>
      </Row>
    </Footer>
  );
}
export default FooterClient;
