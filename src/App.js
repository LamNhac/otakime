import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/vi_VN";

import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { LayoutAdmin, LayoutClient } from "./layouts";
import HomePage from "./pages/client/home_page/HomePage";
import LoginPage from "./pages/admin/login/LoginPage";

import DashboardPage from "./pages/admin/dashboard_page/DashboardPage";
import MoviePage from "./pages/admin/movie_page/MoviePage";
import MangaPage from "./pages/admin/manga_page/MangaPage";
import MailPage from "./pages/admin/mail_page/MailPage";
import CategoryTagPage from "./pages/admin/category_tag_page/CategoryTagPage";
import "../src/css/output.css";
import UploadImagePage from "./pages/admin/upload_image_page/UploadImagePage";

const App = () => {
  return (
    <ConfigProvider locale={locale}>
      <Routes>
        <Route path="/admin" element={<Outlet />}>
          <Route index element={<LoginPage />} />
          <Route element={<LayoutAdmin />}>
            <Route path="dashboard" element={<DashboardPage />}></Route>
            <Route path="manga" element={<MangaPage />}></Route>
            <Route path="movie" element={<MoviePage />}></Route>
            <Route path="mail" element={<MailPage />}></Route>
            <Route path="upload-manga" element={<UploadImagePage />}></Route>
            <Route path="tags" element={<CategoryTagPage />}></Route>
          </Route>
        </Route>
        <Route path="/" element={<Outlet />}>
          <Route element={<LayoutClient />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
