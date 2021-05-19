import { React, useEffect, useState } from "react";
import "../../App.css";
import { Route, Redirect, useHistory } from "react-router-dom";
import { loginConfirmed } from "../../utils/subjects/loginSubject/loginSubject";
import { useForm } from "react-hook-form";
import { login, createUser } from "../../functions/users";

function Login({props}) {

  const { register, handleSubmit } = useForm();
  // const onSubmit = async (data) => {
  //   var reponse = await checkemail(data);
  //   if (!reponse){
  //     var loginreponse = await login(data);
  //     console.log(loginreponse);
  //     Log();
  //   }
  //   else{
  //     alert("מייל לא אושר");
  //   }
  //   console.log(reponse);
    
  // };

  const onSubmit = async (data) => {
    var reponse = await login(data);
    // console.log(reponse);
    console.log(reponse.data);
    if (reponse.data != false){
      Log();
    }
    else{
      alert("Please Verify Your Email!");
    }
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
        <div className="row" style={{width: '100%'}}>
          <div><input className="inputclass" {...register("username")} onChange={(w) =>{setUsernameInput(w.target.value)}} style={{ width: "200px" }} required="true" type="mail"></input></div>
          <div>שם משתמש</div>
        </div>
        <div className="row" style={{width: '100%'}}>
          <div><input className="inputclass" type="password" required="true" {...register("password")} style={{ marginBottom: "30px", width: "200px" }}></input></div>
          <div>סיסמה</div>
        </div>
        {/* <button type="submit" className="button button1" onClick={Log}>submit</button> */}
        <div className="Row">
          <button type="submit" className="button button1">התחבר</button>
          <button className="button button1" onClick={()=>{Redirect('Password')}} style={{marginLeft:'10px'}}>שכחתי סיסמה</button>
          <button className="button button1" onClick={()=>{Redirect('Signup')}} style={{marginLeft:'10px'}}>הירשם</button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
