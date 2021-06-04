import { React, useEffect, useState } from "react";
import "../../App.css";
import { Route, Redirect, useHistory, withRouter } from "react-router-dom";
import { loginConfirmed } from "../../utils/subjects/loginSubject/loginSubject";
import { useForm } from "react-hook-form";
import { login, createUser } from "../../functions/users";
import swal from 'sweetalert';
// import swal from '@sweetalert/with-react'


function Login({props}) {

  var userName = "";

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
    // console.log(reponse.data);
   // console.log(reponse.data.Name);
    if (reponse.data == "WrongPass"){
      // swal("Wrong Password!", "Close");
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
      // alert("Wrong Password!");
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
      // alert("User not Found!");
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
        // alert("Please Verify Your Email!");
      }
    }
    // if (reponse.data != "WrongPass"){
    //   if (reponse.data != false){
    //     Log();
    //   }
    //   else{
    //     alert("Please Verify Your Email!");
    //   }
    // }
    // else{
    //   alert("Wrong Password!");
    // }
    // if (reponse.data != false){
    //   if (reponse.data != "WrongPass"){
    //     Log();
    //   }
    //   else{
    //     alert("Wrong Password!");
    //   }
    // }
    // else{
    //   alert("Please Verify Your Email!");
    // }
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
    Redirect('Home');
  }

  return (
    <div className="Home" >
        <p style={{ fontSize: "45px", fontWeight:"bold" }}>PartnerTAU ברוכים הבאים לאתר</p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row" style={{width: '100%'}}>
          <div><input className="inputclass"  {...register("username")} style={{ width: "200px" }} required="true" minLength="6" type="mail"></input></div>
          <div>מייל</div>
        </div>
        <div className="row" style={{width: '100%'}}>
          <div><input className="inputclass" type="password" required="true" {...register("password")} style={{ marginBottom: "30px", width: "200px" }}></input></div>
          <div>סיסמה</div>
        </div>
        <br></br>
        {/* <button type="submit" className="button button1" onClick={Log}>submit</button> */}
        <div className="line">
          <button type="submit" className="button button1">התחבר</button>
          <button className="button button1" onClick={()=>{Redirect('Password')}} style={{marginLeft:'10px'}}>שכחתי סיסמה</button>
          <button className="button button1" onClick={()=>{Redirect('Signup')}} style={{marginLeft:'10px'}}>הירשם</button>
        </div>
        </form>
        
      </div>
  );
}

export default Login;
