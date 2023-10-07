import { Outlet, useParams } from "react-router-dom";
import FooterClient from "../components/FooterClient";
import HeaderClient from "../components/HeaderClient";
import AppContextClient from "../contexts/AppContextClient";
import LoadingScreen from "../components/LoadingScreen";
import { useEffect, useState } from "react";
import { Layout } from "antd";
const { Content } = Layout;
function LayoutClient() {
  const state = {};

  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    // setIsLoading(true);
    setIsLoading(false);
    // setTimeout(() => {
    // }, 3000);
  }, []);
  return (
    <AppContextClient.Provider value={state}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <HeaderClient />
          <Content className={movieId ? "" : "  container p-4 min-w-full"}>
            <Outlet />
          </Content>
          <FooterClient />
        </>
      )}
    </AppContextClient.Provider>
  );
}
export default LayoutClient;
