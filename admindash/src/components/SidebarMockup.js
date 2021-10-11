import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "./Sidebar";
const SidebarMockup = () => {
  return <Route render={({ history }) => <Sidebar history={history} />} />;
};

export default SidebarMockup;
