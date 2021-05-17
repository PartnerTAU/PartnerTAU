import { React, useEffect, useState } from "react";
import "../../App.css";
import { Route, Redirect, useHistory } from "react-router-dom";
import { loginConfirmed } from "../../utils/subjects/loginSubject/loginSubject";
import { useForm } from "react-hook-form";
import { login, createUser } from "../../functions/users";

function Login({props}) {

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    var reponse = await login(data);
    console.log(reponse);
    Log();
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input className="inputclass" {...register("username")} onChange={(w) =>{setUsernameInput(w.target.value)}} type="mail"></input>שם משתמש
        </div>
        <div>
          <input className="inputclass" type="password" {...register("password")} style={{ marginBottom: "30px" }}></input>סיסמה
        </div>
        {/* <button type="submit" className="button button1" onClick={Log}>submit</button> */}
        <div className="Row">
          <button className="button button1" onClick={()=>{Redirect('Password')}}>שכחתי סיסמה</button>
          <button className="button button1" onClick={()=>{Redirect('Signup')}}>הירשם</button>
          <button type="submit" className="button button1">התחבר</button>
        </div>
        </form>
      </div>
      <button className="button button1">התחבר באמצעות גוגל</button>
    </div>
  );
}

export default Login;
