import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/vi_VN";

import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { LayoutAdmin, LayoutClient } from "./layouts";
import LoginPage from "./pages/admin/login/LoginPage";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../src/css/output.css";

import CategoryTagPage from "./pages/admin/category_tag_page/CategoryTagPage";
import DashboardPage from "./pages/admin/dashboard_page/DashboardPage";
import MailPage from "./pages/admin/mail_page/MailPage";
import MangaPage from "./pages/admin/manga_page/MangaPage";
import MoviePage from "./pages/admin/movie_page/MoviePage";

import UploadImagePage from "./pages/admin/upload_image_page/UploadImagePage";

import { AgeClassificationPage, EventPage, QueryPage, SettingPage, UserPage, VersionPage } from "./pages/admin";
import HistoryPage from "./pages/admin/history_page/HistoryPage";
import {
  AboutPage,
  DetailMangaChapterPage,
  DetailMangaPage,
  DetailMoviePage,
  HomePage,
  InformationClientPage,
  LicensePage,
  MangaPageClient,
  MoviePageClient,
  PageNotFoundPage,
  TermsofusePage
} from "./pages/client";


const App = () => {
  return (
    <ConfigProvider locale={locale}>
        <Routes>
          <Route path="/admin" element={<Outlet />}>
            <Route index element={<LoginPage />} />
            <Route element={<LayoutAdmin />}>
              <Route path="dashboard" element={<DashboardPage />}></Route>
              <Route path="user" element={<UserPage />}></Route>
              <Route path="manga" element={<MangaPage />}></Route>
              <Route path="movie" element={<MoviePage />}></Route>
              <Route path="mail" element={<MailPage />}></Route>
              <Route path="upload" element={<UploadImagePage />}></Route>
              <Route path="tags" element={<CategoryTagPage />}></Route>
              <Route path="history" element={<HistoryPage />}></Route>
              <Route path="event" element={<EventPage />}></Route>

              <Route path="age-classification" element={<AgeClassificationPage />}></Route>
              <Route path="setting" element={<SettingPage />}></Route>

              <Route path="query" element={<QueryPage />}></Route>

              <Route path="version" element={<VersionPage />}></Route>
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
              <Route path="information-user" element={<InformationClientPage />} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFoundPage />} />
        </Routes>

    </ConfigProvider>
  );
};

export default App;
