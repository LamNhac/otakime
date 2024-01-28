import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/vi_VN";

import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { LayoutAdmin, LayoutClient } from "./layouts";
import LoginPage from "./pages/admin/login/LoginPage";

import CategoryTagPage from "./pages/admin/category_tag_page/CategoryTagPage";
import DashboardPage from "./pages/admin/dashboard_page/DashboardPage";
import MailPage from "./pages/admin/mail_page/MailPage";
import MangaPage from "./pages/admin/manga_page/MangaPage";
import MoviePage from "./pages/admin/movie_page/MoviePage";

import UploadImagePage from "./pages/admin/upload_image_page/UploadImagePage";

import { AgeClassificationPage, EventPage, QueryPage, SettingPage, UploadImageMoviePage, UserPage, VersionPage } from "./pages/admin";
import HistoryPage from "./pages/admin/history_page/HistoryPage";

import "../src/css/output.css";

import {
  AboutPage,
  DetailMangaChapterPage,
  DetailMangaPage,
  DetailMoviePage,
  HomePage,
  InformationClientPage,
  LicensePage,
  MaintainPage,
  MangaPageClient,
  MoviePageClient,
  PageNotFoundPage,
  TermsofusePage
} from "./pages/client";


const isMaintain = false
const defaultTitle = 'Otakime - Home'
const defaultDescription= 'Trang web chính thức của nhóm dịch Otakime, Việt hóa những dự án manga nhằm giới thiệu độc giả. Truy cập ngay để đọc những tựa truyện được yêu thích.'

const App = () => {

  useEffect(()=>{
    //Load config...

    //Set Title default
    document.title = defaultTitle;
    const el = document.querySelector("meta[name='description']");
    el.setAttribute('content',defaultDescription)
  },[])
  


  return (
    <ConfigProvider 
      locale={locale}
      theme={{
        token: {
          fontFamily: "Be Vietnam Pro"
        }
      }}
    >
        <Routes>
          <Route path="/admin" element={<Outlet />}>
            <Route index element={<LoginPage />} />
            <Route element={<LayoutAdmin />}>
              <Route path="dashboard" element={<DashboardPage />}></Route>
              <Route path="user" element={<UserPage />}></Route>
              <Route path="manga" element={<MangaPage />}></Route>
              <Route path="movie" element={<MoviePage />}></Route>
              <Route path="mail" element={<MailPage />}></Route>
              <Route path="upload-manga" element={<UploadImagePage />}></Route>
              <Route path="upload-movie" element={<UploadImageMoviePage />}></Route>
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
            {
              isMaintain ? <Route index element={<MaintainPage/>}/> :             
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
            }
          </Route>

          <Route path="*" element={<PageNotFoundPage />} />
        </Routes>

    </ConfigProvider>
  );
};

export default App;
