import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import AdminPanel from "./screens/AdminPanel";
import AuditorEditScreen from "./screens/AuditorEditScreen";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Router>
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/dashboard" component={AdminPanel} />
        <Route path="/master/auditor/:id/edit" component={AuditorEditScreen} />

      </Router>
    </>
  );
}

export default App;
