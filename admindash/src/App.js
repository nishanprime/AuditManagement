import "./App.css";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import AdminPanel from "./screens/AdminPanel";
import AuditorEditScreen from "./screens/AuditorEditScreen";
import ClientListScreen from "./screens/ClientListScreen";
import ClientEditScreen from "./screens/ClientEditScreen";
import ClientScreen from "./screens/ClientScreen";

function App() {
  return (
    <>
      <Router>
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
      </Router>
    </>
  );
}

export default App;
