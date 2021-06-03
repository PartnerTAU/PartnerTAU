import {React,useEffect, useState} from 'react';
import '../../App.css';
import {Route, Redirect, useHistory} from 'react-router-dom'
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { createUser } from "../../functions/users";
import ReactDOM from 'react-dom';


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
    const [IsUserEmail,IsSetUserEmail] = useState(false);
    const [IsUserName,IsSetUserName] = useState(false);
    const [IsPassF,IsSetPassF] = useState(false);
    const [IsPassS,IsSetPassS] = useState(false);


    const onSubmit = async (data) => {
      var endEmail = userEmail.split("@")[1];
      var correctMail= "mail.tau.ac.il";
      if (endEmail.localeCompare(correctMail) == 0){
        // setCorrectMail(true);
        worngEmailModalIsOpen = false;
        // correctMail = true;
      }
      else{
        // setCorrectMail(false);
        worngEmailModalIsOpen = true;
        // correctMail = false;
      }
      if (passFInput == passSInput && !worngEmailModalIsOpen && IsUserName){
        var reponse = await createUser(data);
        console.log(reponse.data);
        if (reponse.data == "EmailSend"){
          openModal()
          return;
        }
        if (reponse.data == "InUse"){
          alert("כתובת המייל נמצאת בשימוש");
          Redirect('Home');
          return;
        }
      }
      openModal()
      // var reponse = await createUser(data);
    };

    function handleNameChange(evt){
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
      // IsSetUserEmail(false);
      // IsSetPassF(false);
      // IsSetPassS(false);
    }

  return (
    <div className="Home">
      <div >
        <p style={{fontSize: "50px", fontWeight:"bold" }}>PartnerTAU ברוכים הבאים להרשמה לאתר</p>
        <div className="col" >
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className="row" style={{width: '100%' }} >
              <input className="inputclass" {...register("privatename")} type ="text" required="true" onChange={handleNameChange} style={{width: '190px'}} ></input>
              <div>שם משתמש</div>
            </div>

            <div className="row" style={{width: '100%'}}>
              <input {...register("username")} className="inputclass" type ="email" required="true" placeholder="כתובת מייל אוניברסיטאית" onChange={handleEmailChange} style={{width: '190px'}}></input>
              <div>מייל</div>
            </div>

            <div className="row" style={{width: '100%'}}>
            <input id="passF" {...register("password")} className="inputclass" type ="password" minLength="6" required="true"  
            onChange={handlePassFChange} style={{width: '190px'}} ></input>
              <div>סיסמה</div>
            </div>
            <div className="row" style={{width: '100%'}}>
            <input id="passS" className="inputclass" type ="password" maxLength = "10" required="true"
            onChange={handlePassSChange} style={{width: '190px'}}></input>
              <div>אימות סיסמה</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
              {/* <button type="submit" className="button button1" onClick={openModal}>הירשם</button> */}
              <button type="submit" className="button button1" style={{fontSize:"30px"}}>הירשם</button>
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