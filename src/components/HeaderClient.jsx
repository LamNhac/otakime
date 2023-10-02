/* eslint-disable react/jsx-no-target-blank */
import { Image, Layout } from "antd";
import { Link } from "react-router-dom";
import IMAGES from "../constants/images";
import { BsDiscord, BsFacebook } from "react-icons/bs";
const { Header } = Layout;
function HeaderClient() {
  return (
    <Header className="flex items-center justify-between">
      <Link to="/" className="items-center justify-center h-full">
        <Image
          src={IMAGES.logo}
          style={{ width: 200, height: "100%" }}
          preview={false}
        />
      </Link>
      <div className="flex flex-row gap-5">
        <Link to="manga" style={{ color: "white" }}>
          MANGA
        </Link>
        <Link to="movie" style={{ color: "white" }}>
          MOVIE
        </Link>
        <Link to="about" style={{ color: "white" }}>
          ABOUT
        </Link>
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
