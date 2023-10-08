import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/vi_VN";

import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { LayoutAdmin, LayoutClient } from "./layouts";
import LoginPage from "./pages/admin/login/LoginPage";

import "../src/css/output.css";
import CategoryTagPage from "./pages/admin/category_tag_page/CategoryTagPage";
import DashboardPage from "./pages/admin/dashboard_page/DashboardPage";
import MailPage from "./pages/admin/mail_page/MailPage";
import MangaPage from "./pages/admin/manga_page/MangaPage";
import MoviePage from "./pages/admin/movie_page/MoviePage";

import UploadImagePage from "./pages/admin/upload_image_page/UploadImagePage";

import {
  AboutPage,
  DetailMangaChapterPage,
  DetailMangaPage,
  DetailMoviePage,
  HomePage,
  LicensePage,
  MangaPageClient,
  MoviePageClient,
  TermsofusePage,
} from "./pages/client";
import HistoryPage from "./pages/admin/history_page/HistoryPage";

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
            <Route path="upload" element={<UploadImagePage />}></Route>
            <Route path="tags" element={<CategoryTagPage />}></Route>
            <Route path="history" element={<HistoryPage />}></Route>
          </Route>
        </Route>
        <Route path="/" element={<Outlet />}>
          <Route element={<LayoutClient />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="manga" element={<MangaPageClient />} />
            <Route path="manga/:mangaId" element={<DetailMangaPage />} />
            <Route
              path="manga/:mangaId/:chapterId"
              element={<DetailMangaChapterPage />}
            />
            <Route path="movie" element={<MoviePageClient />} />
            <Route path="movie/:movieId" element={<DetailMoviePage />} />
            <Route path="termsofuse" element={<TermsofusePage />} />
            <Route path="license" element={<LicensePage />} />
          </Route>
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
