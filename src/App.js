import logo from './logo.svg';
import './App.css';
import moment from "moment";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/homepage'
import Login from './pages/loginpage'
import Courses from './pages/coursespage'
import List from './pages/listpage'
import NavBar from './pages/navbar'
import SignUp from './pages/signup';
import Password from './pages/password';

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
      <Route path="/Signup" exact component={SignUp} />
      <Route path="/Password" exact component={Password} />

      </Switch>
    </div>
  );
}

export default App;