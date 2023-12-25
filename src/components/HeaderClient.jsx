/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import {
  BarsOutlined,
  GoogleOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Drawer, Dropdown, Image, Layout, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { BsDiscord, BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";
import IMAGES from "../constants/images";
import AppContextClient from "../contexts/AppContextClient";
import {
  getRedirectResultUser,
  logout,
  onChangeToken,
  signInClientUser,
} from "../services/firebase";
const { Header } = Layout;
function HeaderClient() {
  const { userClient, setUserClient, isLoginUser, setIsLoginUser } =
    useContext(AppContextClient);

  const [user, setUser] = useState({
    photoURL: "",
    displayName: "",
  });

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(null);

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
    setIsLoadingAvatar(true);
    getRedirectResultUser().then((result) => {
      if (result) {
        setIsLoginUser(true);
        setUserClient(result);
        setUser({
          photoURL: result.user.photoURL,
          displayName: result.user.displayName,
        });
        setIsLoadingAvatar(false);
      } else {
        onChangeToken().then((user) => {
          if (user && user.photoURL) {
            setIsLoginUser(true);
            setUserClient(user);
            console.log(user);
            setUser({
              photoURL: user.photoURL,
              displayName: user.displayName,
            });
            setIsLoadingAvatar(false);
          }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = [
    {
      key: "1",
      label: <Link to="information-user">Trang cá nhân</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        logout()
          .then(() => {
            setIsLoginUser(false);
          })
          .catch((error) => {
            message.error(error);
          });
      },
    },
  ];

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
            title={
              <div className="w-full flex items-center justify-between">
                <Image src={IMAGES.logo} preview={false} width={100} />
                <Avatar src={user?.photoURL} />
              </div>
            }
            placement="right"
            width="80%"
            onClose={() => setIsOpenDrawer(false)}
            open={isOpenDrawer}
            destroyOnClose={true}
          >
            <div className="flex flex-col  justify-between h-[100%]">
              <div className="flex flex-col gap-5 items-center">
                <Link
                  to="/"
                  onClick={() => {
                    setIsOpenDrawer(false);
                  }}
                >
                  Home
                </Link>
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
                <Link
                  to="information-user"
                  onClick={() => {
                    setIsOpenDrawer(false);
                  }}
                >
                  User
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
                  <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    trigger={["click"]}
                    arrow
                    load
                  >
                    <Avatar src={user?.photoURL} />
                  </Dropdown>
                </>
              ) : (
                <>
                  <Button
                    type="primary"
                    icon={<GoogleOutlined />}
                    onClick={() => {
                      signInClientUser().catch((error) => {
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
