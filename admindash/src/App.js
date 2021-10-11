import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import AdminPanel from './screens/AdminPanel';

function App() {
  return (
    <>
      <Router>
        <Route path="/login" component={LoginScreen} exact/>
        <Route path="/dashboard" component={AdminPanel} exact/>
      </Router>
      </>
  );
}

export default App;