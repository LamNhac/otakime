/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppstoreOutlined,
  BookOutlined,
  CloudUploadOutlined,
  DashboardOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SendOutlined,
  SettingOutlined,
  TagOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Image, Layout, Menu, Modal, theme } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AppContextAdmin from "../contexts/AppContextAdmin";
const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children = null, type) {
  return { key, icon, children, label, type };
}
function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    getItem(
      <Link to="/admin/dashboard" style={{ fontSize: 16 }}>
        Dashboard
      </Link>,
      "Tổng quan",
      <DashboardOutlined style={{ fontSize: 16 }} />
    ),
    getItem(
      <Link to="/admin/user" style={{ fontSize: 16 }}>
        User
      </Link>,
      "user",
      <UserOutlined style={{ fontSize: 16 }} />
    ),

    getItem("Upload", "upload", <CloudUploadOutlined />, [
      getItem(
        <Link to="/admin/upload-manga">Upload Manga</Link>,
        "upload-manga",
        <UploadOutlined style={{ fontSize: 16 }} />
      ),
      getItem(
        <Link to="/admin/upload-movie">Upload Movie</Link>,
        "upload-movie",
        <UploadOutlined style={{ fontSize: 16 }} />
      ),
    ]),

    getItem(
      <Link to="/admin/manga" style={{ fontSize: 16 }}>
        Manga
      </Link>,
      "manga",
      <BookOutlined style={{ fontSize: 16 }} />
    ),

    getItem(
      <Link to="/admin/movie" style={{ fontSize: 16 }}>
        Movie
      </Link>,
      "Movie",
      <DesktopOutlined style={{ fontSize: 16 }} />
    ),
    getItem(
      <Link to="/admin/mail" style={{ fontSize: 16 }}>
        Mail
      </Link>,
      "trang-chu",
      <SendOutlined style={{ fontSize: 16 }} />
    ),
    getItem("Category", "danh-muc", <AppstoreOutlined />, [
      getItem(
        <Link to="/admin/tags">Tags</Link>,
        "tags",
        <TagOutlined style={{ fontSize: 16 }} />
      ),
      getItem(
        <Link to="/admin/age-classification">Age Classification</Link>,
        "age-classification",
        <DashboardOutlined style={{ fontSize: 16 }} />
      ),
    ]),
    getItem(
      <Link to="/admin/event" style={{ fontSize: 16 }}>
        Event
      </Link>,
      "event",
      <DashboardOutlined style={{ fontSize: 16 }} />
    ),
    getItem(
      <Link to="/admin/history" style={{ fontSize: 16 }}>
        History
      </Link>,
      "lich-su",
      <DashboardOutlined style={{ fontSize: 16 }} />
    ),
    getItem(
      <Link to="/admin/setting" style={{ fontSize: 16 }}>
        Setting
      </Link>,
      "setting",
      <SettingOutlined style={{ fontSize: 16 }} />
    ),
    getItem(
      <Link to="/admin/query" style={{ fontSize: 16 }}>
        Query
      </Link>,
      "query",
      <DashboardOutlined style={{ fontSize: 16 }} />
    ),
    getItem(
      <Link to="/admin/version" style={{ fontSize: 16 }}>
        Version
      </Link>,
      "version",
      <DashboardOutlined style={{ fontSize: 16 }} />
    ),
  ];
  const navigate = useNavigate();
  useEffect(() => {
    const isLoginAdmin = localStorage.getItem("isLoginAdmin");
    const accessToken = localStorage.getItem("accessToken");
    console.log("", isLoginAdmin);
    if (!isLoginAdmin) {
      Modal.error({
        title: "Bạn không có quyền truy cập",
        onOk: () => {
          navigate("/admin");
        },
        onCancel: () => {
          navigate("/admin");
        },
        okType: "text",
      });
    }
  }, []);

  useEffect(() => {}, []);

  const state = {};

  return (
    <AppContextAdmin.Provider value={state}>
      <Layout style={{ height: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ background: colorBgContainer }}
        >
          <a onClick={() => window.open(window.location.origin)}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/app?alt=media&token=d6849d49-7890-48a3-bcae-30c05a3ccd4f"
              style={{ padding: 20 }}
              preview={false}
            />
          </a>
          <Menu mode="inline" defaultSelectedKeys={["1"]} items={items} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              minHeight: 280,
              overflowY: "scroll",
              padding: 10,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </AppContextAdmin.Provider>
  );
}
export default LayoutAdmin;
