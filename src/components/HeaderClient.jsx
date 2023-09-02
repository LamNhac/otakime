/* eslint-disable react/jsx-no-target-blank */
import { Image, Layout } from "antd";
import { Link } from "react-router-dom";
import IMAGE from "../constants/image";
import { BsDiscord, BsFacebook } from "react-icons/bs";
const { Header } = Layout;
function HeaderClient() {
  return (
    <Header className="flex items-center justify-between">
      <Image src={IMAGE.logo} style={{ width: 300 }} preview={false} />
      <div className="flex flex-row gap-5">
        <Link style={{ color: "white" }}>MANGA</Link>
        <Link style={{ color: "white" }}>MOVIE</Link>
        <Link style={{ color: "white" }}>ABOUT</Link>
        <div className="flex items-center gap-5 ">
          <a href="https://www.facebook.com/Otakime3.0" target="_blank">
            <BsFacebook color="white" size={20} />
          </a>
          <a href="#">
            <BsDiscord color="white" size={20} />
          </a>
        </div>
      </div>
    </Header>
  );
}
export default HeaderClient;
