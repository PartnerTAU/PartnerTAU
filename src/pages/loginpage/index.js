import { React, useEffect, useState } from "react";
import "../../App.css";
import { Route, Redirect, useHistory } from "react-router-dom";
import { loginConfirmed } from "../../utils/subjects/loginSubject/loginSubject";

function Login({props}) {
  const [usernameInput,setUsernameInput] = useState("");

  const history = useHistory();
  function Redirect(page){
    props(false);
    history.push("/"+page);
    return <Redirect    to={{
      pathname:'/'+page
        }}/>
  }

  const [modalIsOpen, setIsOpen] = useState(false);


  function closeModal() {
    setIsOpen(false);
  }


  function Log() {
    if (localStorage.getItem("user")) {
      //Connected
      localStorage.removeItem("user");
    } else {
      localStorage.setItem("user", usernameInput);
    }
    loginConfirmed.subjectTrigger();
  }

  return (
    <div className="Home">
      <div className="login">
        <p staly={{ marginBottom: "30px" }}>PartnerTAU ברוכים הבאים לאתר</p>
        <div>
          <input className="inputclass" onChange={(w) =>{setUsernameInput(w.target.value)}} type="text"></input>שם משתמש
        </div>
        <div>
          <input className="inputclass" type="password" style={{ marginBottom: "30px" }}></input>סיסמה
        </div>
        <div className="Row">
          <button className="button button1" onClick={()=>{Redirect('Password')}}>שכחתי סיסמה</button>
          <button className="button button1" onClick={()=>{Redirect('SignUp')}}>הירשם</button>
          <button onClick={Log} className="button button1">
            התחבר
          </button>
        </div>
      </div>
      <button className="button button1">התחבר באמצעות גוגל</button>
    </div>
  );
}

export default Login;
