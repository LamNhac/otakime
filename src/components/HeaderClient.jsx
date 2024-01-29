/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import {
  BarsOutlined,
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Drawer, Image, Layout, Row, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { BsDiscord, BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";
import AppContextClient from "../contexts/AppContextClient";
import {
  getRedirectResultUser,
  logout,
  onChangeToken,
} from "../services/firebase";
import ButtonGradient from "./ButtonGradient";
const { Header } = Layout;
function HeaderClient({ logo }) {
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
            {logo && (
              <Image
                preview={false}
                src={logo}
                style={{ width: 150, height: "100%" }}
              />
            )}
          </Link>
          <Button
            icon={<BarsOutlined />}
            ghost
            onClick={() => setIsOpenDrawer(true)}
          ></Button>
          <Drawer
            title={
              <div className="w-full flex items-center justify-between">
                {logo && <Image preview={false} src={logo} width={100} />}
                {/* <Avatar src={user?.photoURL} /> */}
              </div>
            }
            placement="right"
            width="80%"
            onClose={() => setIsOpenDrawer(false)}
            open={isOpenDrawer}
            destroyOnClose={true}
          >
            <div className="flex flex-col  justify-between h-[100%]">
              <div className="flex flex-wrap gap-5 items-center">
                <Row gutter={[12, 12]}>
                  <Col xs={12} md={12} lg={12}>
                    <Link
                      to="/"
                      onClick={() => {
                        setIsOpenDrawer(false);
                      }}
                    >
                      <ButtonGradient>
                        <HomeOutlined style={{ fontSize: 20 }} />
                        <span>HOME</span>
                      </ButtonGradient>
                    </Link>
                  </Col>
                  <Col xs={12} md={12} lg={12}>
                    <Link
                      to="manga"
                      onClick={() => {
                        setIsOpenDrawer(false);
                      }}
                    >
                      <ButtonGradient>
                        <BookOutlined style={{ fontSize: 20 }} />
                        <span>MANGA</span>
                      </ButtonGradient>
                    </Link>
                  </Col>
                  <Col xs={12} md={12} lg={12}>
                    <Link
                      to="movie"
                      onClick={() => {
                        setIsOpenDrawer(false);
                      }}
                    >
                      <ButtonGradient>
                        <BookOutlined style={{ fontSize: 20 }} />
                        <span>MOVIE</span>
                      </ButtonGradient>
                    </Link>
                  </Col>
                  {/* <Col xs={12} md={12} lg={12}>
                    <Link
                      to="about"
                      onClick={() => {
                        setIsOpenDrawer(false);
                      }}
                    >
                      <ButtonGradient>
                        <BookOutlined style={{ fontSize: 20 }} />
                        <span>ABOUT</span>
                      </ButtonGradient>
                    </Link>
                  </Col> */}
                  <Col xs={12} md={12} lg={12}>
                    <Link
                      to="information-user"
                      onClick={() => {
                        setIsOpenDrawer(false);
                      }}
                    >
                      <ButtonGradient>
                        <UserOutlined style={{ fontSize: 20 }} />
                        <span>USER</span>
                      </ButtonGradient>
                    </Link>
                  </Col>
                </Row>
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
          <Link to="/" className="flex items-center justify-center h-full">
            {logo && (
              <Image
                preview={false}
                src={logo}
                style={{ width: 150, height: "100%" }}
              />
            )}
          </Link>
          <div className="flex flex-row gap-5">
            <Link to="manga" style={{ color: "white" }}>
              MANGA
            </Link>
            <Link to="movie" style={{ color: "white" }}>
              MOVIE
            </Link>
            {/* <Link to="about" style={{ color: "white" }}>
              ABOUT
            </Link> */}
            <div className="flex items-center gap-5 ">
              <a href="https://www.facebook.com/Otakime3.0" target="_blank">
                <BsFacebook color="white" size={20} />
              </a>
              <a href="#">
                <BsDiscord color="white" size={20} />
              </a>
            </div>
            {/* <div>
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
            </div> */}
          </div>
        </>
      )}
    </Header>
  );
}
export default HeaderClient;
