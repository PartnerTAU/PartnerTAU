import {React,useEffect, useState} from 'react';
import '../../App.css';
import {Route, Redirect, useHistory} from 'react-router-dom'
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { ResetPass } from "../../functions/users";



/* Forgot password modal style*/
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
      width : "520px",
      height: "100px",
    }
  };


function Password() {

    const history = useHistory();
    const [modalIsOpen,setIsOpen] = useState(false);
    const [username, setUsername] = useState(""); 

  function Redirect(page){

    history.push("/"+page);
    return <Redirect    to={{
      pathname:'/'+page
        }}/>
  }
  function openModal(){
    setIsOpen(true);
}


  function closeModal(){
    setIsOpen(false);
    Redirect('Home');
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    var reponse = ResetPass(data);
    console.log(reponse.data);
    openModal();
  };

  return (
    <div className="Home">
      <div className="login" >
        <p staly={{marginBottom: '30px'}}>איפוס סיסמה </p>
        <div className="col" > 
        <form onSubmit={handleSubmit(onSubmit)} >
          <div><input className="inputclass" {...register("mail")} type ="email" style={{width: '160px'}}></input>Email</div>
          <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
          <button type='submit' className="button button1">אפס סיסמא</button>
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
            <div>קישור לאיפוס סיסמא נשלח לכתובת המייל</div>
            <button className="button button1" onClick={closeModal}>סגור</button>
        </div>
        </Modal>
    </div>
  );
}

export default Password;