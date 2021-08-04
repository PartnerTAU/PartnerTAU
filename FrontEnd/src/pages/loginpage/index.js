import { React, useEffect, useState } from "react";
import "../../App.css";
import { Route, Redirect, useHistory, withRouter } from "react-router-dom";
import { loginConfirmed } from "../../utils/subjects/loginSubject/loginSubject";
import { useForm } from "react-hook-form";
import { login, createUser} from "../../functions/users";
import swal from 'sweetalert';



function Login({props}) {

  var userName = "";
  var i =0;
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    var reponse = await login(data);
    if (reponse.data == "WrongPass"){
      swal({
        title: "שגיאה",
        text: "סיסמא/ שם משתמש שגויים",
        icon: "warning",
        dangerMode: true,
        className: "bodyAlert",
        button:{
          text: "close",
          className: "button1"
        }
      })
    }
    else if(reponse.data == "NoUser"){
      swal({
        title: "שגיאה",
        text: "המשתמש לא נמצא",
        icon: "warning",
        dangerMode: true,
        className: "bodyAlert",
        button:{
          text: "close",
          className: "button1"
        }
      })
    }
    else{
      if (reponse.data != false){
        console.log(reponse.data.Name);
        userName = reponse.data.Name;
        setUsernameInput(userName);
        Log();
      }
      else{
        swal({
          title: "שגיאה",
          text: "כתובת המייל טרם אושרה",
          icon: "warning",
          dangerMode: true,
          className: "bodyAlert",
          button:{
            text: "close",
            className: "button1"
          }
        })
      }
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
      // localStorage.setItem("user", usernameInput);
      localStorage.setItem("user", userName);
    }
    loginConfirmed.subjectTrigger();

  }


  return (
    <div className="Home" >
        <p className="websiteTitle">PartnerTAU ברוכים הבאים לאתר</p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row" style={{width: '100%'}}>
          <div><input className="inputclass"  {...register("username")}  required="true" minLength="6" type="mail"></input></div>
          <div>מייל</div>
        </div>
        <div className="row" style={{width: '100%'}}>
          <div><input className="inputclass" type="password" required="true" {...register("password")} ></input></div>
          <div>סיסמה</div>
        </div>
        <br></br>
        <div className="row">
          <button type="submit" className="button button1">התחבר</button>
          <button className="button button1" onClick={()=>{Redirect('Password')}} style={{marginLeft:'10px'}}>שכחתי סיסמה</button>
          <button className="button button1" onClick={()=>{Redirect('Signup')}} style={{marginLeft:'10px'}}>הירשם</button>
        </div>
        </form>

        
      </div>
  );
}

export default Login;
