import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import AdminPanel from "./screens/AdminPanel";
import AuditorEditScreen from "./screens/AuditorEditScreen";
import ClientListScreen from "./screens/ClientListScreen";
import ClientEditScreen from "./screens/ClientEditScreen";
import ClientScreen from "./screens/ClientScreen";
// import Header from "./components/hh/Header";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import website from "./components/website";
const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      <Router>
        
        {userInfo && userInfo.isAdmin && <Header />}
        {userInfo && userInfo.isAdmin && <Sidebar />}
        <div>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/dashboard" component={AdminPanel} exact />
          <Route
            path="/master/auditor/:id/edit"
            component={AuditorEditScreen}
          />
          <Route path="/admin/clientlist" component={ClientListScreen} exact />
          <Route path="/admin/clients/:id/edit" component={ClientEditScreen} />
          <Route path="/admin/clients/:id/info" component={ClientScreen} />
        </div>
        {userInfo && userInfo.isAdmin && <Footer />}
      </Router>
    </>
  );
};

export default App;
