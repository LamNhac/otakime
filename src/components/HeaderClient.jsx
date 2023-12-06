/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import { Avatar, Button, Drawer, Image, Layout, message } from "antd";
import { Link } from "react-router-dom";
import IMAGES from "../constants/images";
import { BsDiscord, BsFacebook } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import {
  BarsOutlined,
  GoogleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { signInClientUser, getRedirectResultUser } from "../services/firebase";
import AppContextClient from "../contexts/AppContextClient";
const { Header } = Layout;
function HeaderClient() {
  const { userClient, setUserClient, isLoginUser, setIsLoginUser } =
    useContext(AppContextClient);

  const [user, setUser] = useState(null);

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
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

  useEffect(() => {
    getRedirectResultUser().then((result) => {
      if (result) {
        setIsLoginUser(true);
        // setUserClient(result);
        setUser(result);
        console.log("result", result);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("user", user?.user?.photoURL);

  return (
    <Header
      className="flex items-center justify-between bg-gradient-to-r from-[#ADF709] via-[#F3ADC3] to-[#00CCFF]"
      style={{
        width: "100%",
        top: 0,
        paddingInline: 20,
      }}
    >
      {windowWidth < 640 ? (
        <>
          <Link to="/" className="flex items-center justify-start">
            <Image src={IMAGES.logo} preview={false} width={200} />
          </Link>
          <Button
            icon={<BarsOutlined />}
            ghost
            onClick={() => setIsOpenDrawer(true)}
          ></Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            width="80%"
            onClose={() => setIsOpenDrawer(false)}
            open={isOpenDrawer}
            destroyOnClose={true}
          >
            <div className="flex flex-col  justify-between h-[100%]">
              <div className="flex flex-col gap-5 items-center">
                <Link
                  to="manga"
                  onClick={() => {
                    setIsOpenDrawer(false);
                  }}
                >
                  MANGA
                </Link>
                <Link
                  to="movie"
                  onClick={() => {
                    setIsOpenDrawer(false);
                  }}
                >
                  MOVIE
                </Link>
                <Link
                  to="about"
                  onClick={() => {
                    setIsOpenDrawer(false);
                  }}
                >
                  ABOUT
                </Link>
              </div>
              <div className="flex items-center justify-center gap-5 ">
                <a href="https://www.facebook.com/Otakime3.0" target="_blank">
                  <BsFacebook size={20} />
                </a>
                <a href="#">
                  <BsDiscord size={20} />
                </a>
              </div>
            </div>
          </Drawer>
        </>
      ) : (
        <>
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
            <div>
              {isLoginUser ? (
                <>
                  <Avatar src={user?.user?.photoURL} />
                  <Button
                    type="primary"
                    icon={<LogoutOutlined />}
                    onClick={() => {}}
                  >
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="primary"
                    icon={<GoogleOutlined />}
                    onClick={() => {
                      signInClientUser()
                        .then((result) => {
                          // const accessToken = result.user.accessToken;
                          // const accessTokenLocalStorage =
                          //   localStorage.getItem("accessTokenClient");
                          // if (accessToken === accessTokenLocalStorage) {
                          // }
                          // console.log("result", result);
                          // setUserClient(result);
                        })
                        .catch((error) => {
                          message.error(error);
                        });
                    }}
                  >
                    Đăng nhập Google
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </Header>
  );
}
export default HeaderClient;
