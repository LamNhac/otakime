/* eslint-disable react-hooks/exhaustive-deps */
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme } from "antd";
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
      <DashboardOutlined style={{ fontSize: 16 }} />
    ),

    getItem("Upload", "upload", <ShopOutlined />, [
      getItem(
        <Link to="/admin/upload-manga">Upload Manga</Link>,
        "upload-manga",
        <DashboardOutlined style={{ fontSize: 16 }} />
      ),
      getItem(
        <Link to="/admin/upload-movie">Upload Movie</Link>,
        "upload-movie",
        <DashboardOutlined style={{ fontSize: 16 }} />
      ),
    ]),

    getItem(
      <Link to="/admin/manga" style={{ fontSize: 16 }}>
        Manga
      </Link>,
      "manga",
      <DashboardOutlined style={{ fontSize: 16 }} />
    ),

    getItem(
      <Link to="/admin/movie" style={{ fontSize: 16 }}>
        Movie
      </Link>,
      "Movie",
      <DashboardOutlined style={{ fontSize: 16 }} />
    ),
    getItem(
      <Link to="/admin/mail" style={{ fontSize: 16 }}>
        Mail
      </Link>,
      "trang-chu",
      <DashboardOutlined style={{ fontSize: 16 }} />
    ),
    getItem("Danh mục", "danh-muc", <ShopOutlined />, [
      getItem(
        <Link to="/admin/tags">Thể loại</Link>,
        "tags",
        <DashboardOutlined style={{ fontSize: 16 }} />
      ),
      getItem(
        <Link to="/admin/age-classification">Phân loại tuổi</Link>,
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
      <DashboardOutlined style={{ fontSize: 16 }} />
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
  const state = {};

  return (
    <AppContextAdmin.Provider value={state}>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
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
