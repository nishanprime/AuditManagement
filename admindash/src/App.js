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
import ClientDashboard from "./screens/ClientDashboard";
import AuditorScreen from "./screens/AuditorScreen";
import AuditFilesInfo from "./screens/AuditFilesInfo";
import Auditors from "./screens/Auditors";
const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      <Router>
        {userInfo && userInfo.isAdmin ? (
          <Route path="/" component={LoginScreen} exact />
        ) : (
          <Route path="/" component={website} exact />
        )}

        {!userInfo ||
          (!userInfo.isAdmin && <Route path="/" component={website} />)}
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
          <Route path="/admin/clients/:id/messages" component={ClientScreen} />
          <Route path="/clientdashboard" component={ClientDashboard} />
          <Route path="/master/auditors/:id/info" component={AuditorScreen} />
          <Route path="/admin/auditors" component={Auditors} />
          <Route path="/admin/auditfiles" component={AuditFilesInfo} />
        </div>
        {userInfo && userInfo.isAdmin && <Footer />}
      </Router>
    </>
  );
};

export default App;
