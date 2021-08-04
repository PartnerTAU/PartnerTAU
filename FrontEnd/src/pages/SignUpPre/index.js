import {React,useEffect, useState} from 'react';
import '../../App.css';
import {Route, Redirect, useHistory} from 'react-router-dom'
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { createUser } from "../../functions/users";
import ReactDOM from 'react-dom';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme } from '@material-ui/core/styles';

import swal from 'sweetalert';



const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : "#d3f1ef",
      position              : "fixed",
      width: "300px",
      height: "100px",
    }
  };


function SignUpPre() {

    const history = useHistory();
    const [modalIsOpen,setIsOpen] = useState(false);
    const [errorModalIsOpen,setErrorModalIsOpen] = useState(false);
    var [worngEmailModalIsOpen,setWorngEmailModalIsOpen] = useState(false);

    const { register, handleSubmit } = useForm();

    const [passFInput,setPassFInput] = useState("");
    const [passSInput,setPassSInput] = useState("");
    const [userEmail,setUserEmail] = useState("");
    const [userName,setUserName] = useState("");
    const [IsUserEmail,IsSetUserEmail] = useState(false);
    const [IsUserName,IsSetUserName] = useState(false);
    const [IsPassF,IsSetPassF] = useState(false);
    const [IsPassS,IsSetPassS] = useState(false);


    const [values, setValues] = useState({
        showPasswordFirst: false,
        showPasswordSecond: false,
      });

    const handleClickShowPasswordFirst = () => {
        setValues({ ...values, showPasswordFirst: !values.showPasswordFirst });
    };
    
    const handleMouseDownPasswordFirst = (event) => {
        event.preventDefault();
    };

    const handleClickShowPasswordSecond = () => {
        setValues({ ...values, showPasswordSecond: !values.showPasswordSecond });
    };
    
    const handleMouseDownPasswordSecond = (event) => {
        event.preventDefault();
    };



    const onSubmit = async (data) => {
      var endEmail = userEmail.split("@")[1];
      var correctMail_1= "mail.tau.ac.il";
      var correctMail_2 = "tauex.tau.ac.il";
      var correctMail_3 = "eng.tau.ac.il";
      if ((endEmail.localeCompare(correctMail_1) == 0) || (endEmail.localeCompare(correctMail_2) == 0) 
      || (endEmail.localeCompare(correctMail_3) == 0)){
        worngEmailModalIsOpen = false;
      }
      else{
        worngEmailModalIsOpen = true;
      }
      if (passFInput == passSInput && !worngEmailModalIsOpen && IsUserName){
        var dict = {
            privatename: userName,
            username: userEmail,
            password: passFInput
        };
        console.log(dict);
        var reponse = await createUser(dict);
        console.log(reponse.data);
        if (reponse.data == "EmailSend"){
          openModal()
          return;
        }
        if (reponse.data == "InUse"){
          swal({
            title: "אזהרה",
            text:"כתובת המייל נמצאת בשימוש",
            icon: "warning",
            dangerMode: true,
            className: "bodyAlert",
            button:{
              text: "close",
              className: "button1"
            }
          })
          Redirect('Home');
          return;
        }
      }
      openModal()
    };

    function handleNameChange(evt){
        setUserName(evt.target.value);
        IsSetUserName(evt.target.required && evt.target.value != '');
    }

    function handleEmailChange(evt){
        setUserEmail(evt.target.value);
        IsSetUserEmail(evt.target.required && evt.target.value != '');
    }

    function handlePassFChange(evt){
      setPassFInput(evt.target.value);
      IsSetPassF(evt.target.required && evt.target.value != '');
    }

    function handlePassSChange(evt){
      setPassSInput(evt.target.value);
      IsSetPassS(evt.target.required && evt.target.value != '');
    }


    function Redirect(page){
      history.push("/"+page);
      return <Redirect    to={{
        pathname:'/'+page
          }}/>
    }
  
    function openModal(){
      setIsOpen(passFInput == passSInput && IsUserEmail && IsPassF && IsPassS && !worngEmailModalIsOpen && IsUserName);
      setErrorModalIsOpen(passFInput != passSInput && IsUserEmail && IsPassF && IsPassS && IsUserName);
      setWorngEmailModalIsOpen(worngEmailModalIsOpen);
    }


    function closeModal(){
      setIsOpen(false);
      setErrorModalIsOpen(false);
      setWorngEmailModalIsOpen(false);
    }

  return (
    <div className="Home">
      <div className="login" >
        <p className="websiteTitle">PartnerTAU ברוכים הבאים להרשמה לאתר</p>
        <div className="col" >
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className="row" style={{width: '100%' }} >
            <FormControl>
                <Input
               className="inputclass" 
                type ="" 
                style={{width: '220px'}}
                required="true" 
                onChange={handleNameChange} 
                aria-describedby="component-helper-text"
                startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                  ></Input>
                <FormHelperText style={{textAlign:"center"}}>שם המשתמש שיוצג באתר</FormHelperText>
            </FormControl>
            <div className="Home">שם משתמש</div>
            </div>
            <div className="row" style={{width: '100%' }} >
            <FormControl >
                <Input
                className="inputclass" 
                type ="email"
                required="true" 
                onChange={handleEmailChange}
                style={{width: '220px'}}
                aria-describedby="component-helper-text"
                startAdornment={
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                }
                ></Input>
                    <FormHelperText style={{textAlign:"center"}}>כתובת מייל אוניברסיטאית</FormHelperText>
            </FormControl>
            <div className="Home">מייל</div>
            </div>
            <div className="row" style={{width: '100%' }} >
            <FormControl >
                <Input 
                id="passS"
                className="inputclass" 
                required="true" 
                minLength="6"
                onChange={handlePassFChange}
                style={{width: '220px'}}
                type={values.showPasswordFirst ? '' : 'password'}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordFirst}
                      onMouseDown={handleMouseDownPasswordFirst}
                    >
                      {values.showPasswordFirst ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                ></Input>
            </FormControl >
            <div className="Home">סיסמא</div>
            </div>
            <div className="row" style={{width: '100%' }} >
            <FormControl >
                <Input 
                id="passS"
                className="inputclass" 
                type ="password"
                required="true" 
                minLength="6"
                onChange={handlePassSChange}
                style={{width: '220px'}}
                aria-describedby="component-helper-text"
                type={values.showPasswordSecond ? '' : 'password'}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordSecond}
                      onMouseDown={handleMouseDownPasswordSecond}
                    >
                      {values.showPasswordSecond ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                ></Input>
                    <FormHelperText style={{textAlign:"center"}}>הקלד פעם נוספת את הסיסמא</FormHelperText>
            </FormControl >
            <div className="Home">אימות סיסמא</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
              <button type="submit" className="button button1">הירשם</button>
            </div>
        </form>
        </div>
      </div>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div className="Modal">
            <div>נשלח מייל אימות</div>
            <button className="button button1" onClick={()=>{Redirect('Home')}}>חזור לדף הבית</button>
        </div>
        </Modal>
        <Modal
          isOpen={errorModalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div className="Modal">
            <div>סיסמאות לא זהות</div>
            <button className="button button1" onClick={closeModal}>נסה שוב</button>
        </div>
        </Modal>
        <Modal
          isOpen={worngEmailModalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div className="Modal3">
            <div>כתובת מייל לא אוניברסטאית</div>
            <button className="button button1" onClick={closeModal}>נסה שוב</button>
        </div>
        </Modal>
    </div>
  );
}

export default SignUpPre;

