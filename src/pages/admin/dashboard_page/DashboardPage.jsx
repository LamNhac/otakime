import React, { useEffect } from "react";
import DashboardContext from "./DashboardContext";
import { ViewFacebook, ViewStatistic } from "./components";

function DashboardPage() {
  useEffect(() => {}, []);

  const state = {};
  return (
    <DashboardContext.Provider value={state}>
      <ViewStatistic />
      <ViewFacebook />
    </DashboardContext.Provider>
  );
}

export default DashboardPage;
