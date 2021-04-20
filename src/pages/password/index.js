import {React,useEffect, useState} from 'react';
import '../../App.css';
import {Route, Redirect, useHistory} from 'react-router-dom'
import Modal from 'react-modal';


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
  }

  return (
    <div className="Home">
      <div className="login" >
        <p staly={{marginBottom: '30px'}}>איפוס סיסמה </p>
        <div className="col" >    
            <div><input className="inputclass" type ="text"></input>Email</div>
        </div>
      </div>
      <button onClick={()=>{openModal()}} className="button button1">אפס סיסמא</button>
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