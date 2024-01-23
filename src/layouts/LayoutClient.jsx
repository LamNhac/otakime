import { Layout } from "antd";
import { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import FooterClient from "../components/FooterClient";
import HeaderClient from "../components/HeaderClient";
import LoadingScreen from "../components/LoadingScreen";
import AppContextClient from "../contexts/AppContextClient";
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

  return (
    <AppContextClient.Provider value={state}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <HeaderClient />
          <Content
            className={server || chapterId ? "" : "  container p-4 min-w-full"}
            style={{
              minHeight: "calc(100vh - 64px - 111px)",
            }}
          >
            <Outlet />
          </Content>
          <FooterClient />
        </>
      )}
    </AppContextClient.Provider>
  );
}
export default LayoutClient;
