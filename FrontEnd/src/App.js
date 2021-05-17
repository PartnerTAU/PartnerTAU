import logo from './logo.svg';
import './App.css';
import moment from "moment";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './pages/navbar'
import {ProtectedRoute} from './pages/protectedRoute/protectedRoute'
import Dashboard from './pages/dashboard/dashboard'
import Courses from './pages/coursespage'
import List from './pages/listpage'
import Password from './pages/password';
import Home from './pages/homepage'
import Signup from './pages/SignUp';
import Login from './pages/loginpage'


function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Home" exact component={Home} />
      <Route path="/Courses" exact component={Courses} />
      <Route path="/List" exact component={List} />
      <Route path="/Login" exact component={Login} />
      <Route path="/Password" exact component={Password} />
      <Route path="/Signup" exact component={Signup} />
      {/* ProtectedRoute path="/Dashboard" exact component={Dashboard} /> */}
      </Switch>
    </div>
  );
}

export default App;
