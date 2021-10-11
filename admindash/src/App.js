import "./App.css";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import AdminPanel from "./screens/AdminPanel";
import AuditorEditScreen from "./screens/AuditorEditScreen";
import ClientListScreen from "./screens/ClinetListScreen";
import ClientEditScreen from "./screens/ClientEditScreen";
import ClientScreen from "./screens/ClientScreen";

function App() {
  return (
    <>
      <Router>
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/dashboard" component={AdminPanel} />
        <Route path="/master/auditor/:id/edit" component={AuditorEditScreen} />
<<<<<<< HEAD
        <Route path="/admin/clientlist" component={ClientListScreen}/>
=======
        <Route path="/admin/clientlist" component={ClientListScreen} exact/>
>>>>>>> 263d2ffbbb52998677d82274fd1759d2dd16468d
        <Route path="/admin/clients/:id/edit" component={ClientEditScreen} />
        <Route path="/admin/clients/:id/info" component={ClientScreen} />
      </Router>
    </>
  );
}

export default App;
