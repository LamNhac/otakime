import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
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
        Tổng quan
      </Link>,
      "Tổng quan",
      <DashboardOutlined style={{ fontSize: 16 }} />
    ),

    getItem(
      <Link to="/admin/upload" style={{ fontSize: 16 }}>
        Upload
      </Link>,
      "upload",
      <DashboardOutlined style={{ fontSize: 16 }} />
    ),

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
      <Link to="/admin/history" style={{ fontSize: 16 }}>
        History
      </Link>,
      "lich-su",
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

  return (
    <AppContextAdmin.Provider value={{}}>
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
