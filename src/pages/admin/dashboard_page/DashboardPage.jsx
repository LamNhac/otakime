import React, { useEffect } from "react";
import DashboardContext from "./DashboardContext";
import { ViewFacebook, ViewStatistic } from "./components";

function DashboardPage() {
  useEffect(() => {}, []);

  const state = {};
  return (
    <DashboardContext.Provider value={state}>
      {localStorage.getItem('accessToken')}
      {localStorage.getItem('isLoginAdmin')}
      <ViewStatistic />
      <ViewFacebook />
    </DashboardContext.Provider>
  );
}

export default DashboardPage;
