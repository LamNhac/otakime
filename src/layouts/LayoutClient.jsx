import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import FooterClient from "../components/FooterClient";
import HeaderClient from "../components/HeaderClient";
import AppContextClient from "../contexts/AppContextClient";
import { getAllDocumentsRealtime } from "../services/firebaseService";
const { Content } = Layout;
function LayoutClient() {
  const [isLoading, setIsLoading] = useState(false);

  const { chapterId } = useParams();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const server = params.get("server");
  // useEffect(() => {
  //   // setIsLoading(true);
  //   setIsLoading(false);
  //   // setTimeout(() => {
  //   // }, 3000);
  // }, []);

  const [userClient, setUserClient] = useState(null);
  const [isLoginUser, setIsLoginUser] = useState(null);

  const [titleDocument, setTitleDocument] = useState("Otakime");
  const [desciption, setDescription] = useState("");

  const [config, setConfig] = useState({
    logo: "",
    iconLogo: "",
    email: "",
  });

  const state = {
    userClient,
    setUserClient,
    isLoginUser,
    setIsLoginUser,
    titleDocument,
    setTitleDocument,
    desciption,
    setDescription,
  };
  useEffect(() => {
    setIsLoading(true);
    // setTimeout(() => {
    // }, 3000);
    getAllDocumentsRealtime("/setting")
      .then((res) => {
        const favicon = document.querySelector("link[rel~='icon']");
        let parseStringIconLogo = JSON.parse(res.iconLogo.iconLogoFile);
        let parseStringLogo = JSON.parse(res.logo.logoImgFile);

        favicon.href = parseStringIconLogo[0].imgUrl;
        setConfig({
          logo: parseStringLogo[0].imgUrl,
          email: res.email,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AppContextClient.Provider value={state}>
      <Spin spinning={isLoading} tip="Đang tải dữ liệu...">
        <HeaderClient logo={config?.logo} />
        <Content
          className={server || chapterId ? "" : "  container p-4 min-w-full"}
          style={{
            minHeight: "calc(100vh - 64px - 111px)",
          }}
        >
          <Outlet />
        </Content>
        <FooterClient logo={config?.logo} email={config?.email} />
        {/* {isLoading ? <LoadingScreen /> : <></>} */}
      </Spin>
    </AppContextClient.Provider>
  );
}
export default LayoutClient;
