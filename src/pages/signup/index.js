import {React,useEffect, useState} from 'react';
import '../../App.css';
import {Route, Redirect, useHistory} from 'react-router-dom'
import Modal from 'react-modal';

/*Signed up successfully modal style*/
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


function SignUp() {

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
        <p staly={{marginBottom: '30px'}}>PartnerTAU ברוכים הבאים להרשמה לאתר</p>
        <div className="col" >
            <div><input className="inputclass" type ="text"></input>שם פרטי</div>
            <div><input className="inputclass" type ="text"></input>שם משפחה</div>      
            <div><input className="inputclass" type ="email" style={{width: '160px'}}></input>Email</div>
            <div><input className="inputclass" type ="password" maxLength = "10"></input>סיסמה</div>
        </div>
      </div>
      <button onClick={()=>{openModal()}} className="button button1">הירשם</button>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div className="Modal">
            <div>נרשמת בהצלחה</div>
            <button className="button button1" onClick={()=>{Redirect('Home')}}>חזור לדף הבית</button>
        </div>
        </Modal>
    </div>
  );
}

export default SignUp;