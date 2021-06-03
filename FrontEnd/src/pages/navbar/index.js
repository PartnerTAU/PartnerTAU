import logo from "../../images/logo.png";
import { React, useEffect, useState } from "react";
import "../../App.css";
import { Route, Redirect, useHistory } from "react-router-dom";
import Login from "../loginpage";
import { loginConfirmed } from "../../utils/subjects/loginSubject/loginSubject";
import { useForm } from "react-hook-form";
import {SignOut } from "../../functions/users";

import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import { grey } from '@material-ui/core/colors';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ListIcon from '@material-ui/icons/List';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { BottomNavigation } from '@material-ui/core';


import Modal from "react-modal";
import { merge } from "rxjs";

/*Sign in modal style*/
const SignInStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    position: "fixed",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d3f1ef",
  },
};

/*About modal style*/
const AboutStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    position: "fixed",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d3f1ef",
    width: "70%",
    height: "70%"
  },
};

/*Contact modal style*/
const ContactStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    position: "fixed",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d3f1ef",
    width: "30%",
    height: "45%",
  },
};

function NavBar() {
  useEffect(() => {
    const subscriptionCC = loginConfirmed
      .onSubjectTrigged()

      .subscribe(() => {
        setIsOpen(false);
        setUsername(localStorage.getItem("user"));
      });
  }, []);

  const history = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modal1IsOpen, setIsOpen1] = useState(false);
  const [modal2IsOpen, setIsOpen2] = useState(false);

  const [buttonString, setButtonString] = useState("");
  const [username, setUsername] = useState("");

  const { register, handleSubmit } = useForm();


  function openModal() {
    setIsOpen(true);
  }

  function openModal1() {
    setIsOpen1(true);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModal1() {
    setIsOpen1(false);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  function Redirect(page) {
    history.push("/" + page);
    return (
      <Redirect
        to={{
          pathname: "/" + page,
        }}
      />
    );
  }

  // const onSubmit = async (data) => {
  //   var reponse = await SignOut();
  //   console.log(reponse);
  //   signOut();
  // };

  function signOut() {
    if (localStorage.getItem("user")) {
      //Connected
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUsername("");
      Redirect("Home");
    }
  }


  return (
    <div className="Home">
      <div className="Top">
        <p className="row">
          {username && username != "" ? (
          <IconButton onClick={signOut}>
            <PowerSettingsNewIcon
              style={{color: grey[50], fontSize: 50, marginRight: 5, marginLeft:5}}>
            </PowerSettingsNewIcon>
          </IconButton>
            // <button onClick={signOut} className="button button1">
            //   התנתק
            // </button>
          ) : (
          <IconButton onClick={openModal}>
            <PersonOutlineOutlinedIcon
              style={{color: grey[50], fontSize: 50, marginRight: 5, marginLeft:5}}>
            </PersonOutlineOutlinedIcon>
          </IconButton>
            // <button onClick={openModal} className="button button1">
            //   התחבר
            // </button>
          )}

          <IconButton onClick={() =>  Redirect("List")}>
          <ListIcon
              style={{color: grey[50], fontSize: 50, marginRight: 5, marginLeft:5}}>
            </ListIcon>
          </IconButton>
  

          {/* <button
            onClick={() => {
              Redirect("List");
            }}
            className="button button1"
          >
            רשימת הבקשות שלי
          </button> */}

          <IconButton onClick={() =>  Redirect("Home")}>
            <HomeOutlinedIcon
              style={{color: grey[50], fontSize: 50, marginRight: 5, marginLeft:5}}>
            </HomeOutlinedIcon>
          </IconButton>

          {/* <button
            onClick={() => {
              Redirect("Home");
            }}
            className="button button1"
          >
            דף הבית
          </button> */}
        </p>
        <div className="row">
          !
          <p style={{marginRight: 30, color: "white"}}>
            <apan>שלום</apan>
            <span> </span>
            <span>{username && username != "" ? username : ""} </span>
          </p>
          

          <IconButton onClick={openModal1}>
            <ContactMailIcon
              style={{color: grey[50], fontSize: 50,  marginRight: 15,marginLeft:15}}>
            </ContactMailIcon>
          </IconButton>
          
          <IconButton nClick={openModal2}>
          <InfoOutlinedIcon
              style={{color: grey[50], fontSize: 50, marginRight: 15, marginLeft:15}}>
            </InfoOutlinedIcon>
          </IconButton>

          {/* <button onClick={openModal1} className="button button1">
            צור קשר
          </button>
          <button onClick={openModal2} className="button button1">
            אודות
          </button> */}
          
          <img src={logo} alt="Logo" />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={SignInStyle}
        contentLabel="Example Modal"
      >
        <button className="buttonclose button1" onClick={closeModal}>X</button>
        <Login props={setIsOpen} />
      </Modal>
      <Modal 
          isOpen={modal1IsOpen}
          onRequestClose={closeModal1}
          style={ContactStyle}
          contentLabel="Example Modal"
        >
  
          <form>
            <p style={{textAlign:"center",fontSize: "30px", fontWeight:"bold", color:"#1b3d3c"}}>צור קשר</p>
            <br></br>
            <div className="line" style={{width: '100%'}}>
              <input className="ContactInput" type ="text" style={{width: '70%'}}></input>
              <p>שם מלא</p>
            </div>
            <div className="line" style={{width: '100%'}}>
              <input className="ContactInput" type ="text" style={{width: '70%'}}></input>
              <p>כתובת מייל</p>
            </div>
            <div className="line" style={{width: '100%'}} >
              <input className="ContactInput" type ="text" style={{width: '70%'}}></input>
              <p>נושא</p>
            </div>
            <div className="line" style={{width: '100%'}}>
              <textarea className="ContactInput" type ="text" style={{width: '70%', height:"40px"}}></textarea>
              <p>גוף ההודעה</p>
            </div>
            <br></br>
             
            <div className="line" style={{ justifyContent:"center"}}>
              <button className="button button1" type="submit" onClick={closeModal1}>שלח</button>
              <button className="button button1" onClick={closeModal1}>סגור</button>
              <button className="button button1" type="reset">אפס</button>

            </div>
          </form>

      </Modal>
      <Modal 
          isOpen={modal2IsOpen}
          onRequestClose={closeModal2}
          style={AboutStyle}
          contentLabel="Example Modal"
        >
        <div>
            <p  style={{textAlign:"center",fontSize: "30px", fontWeight:"bold", color:"#1b3d3c"}}>
              ,הוא כלי עזר להחלפת קורסים או קבוצות בקורסים PartnerTau
              <br></br>
              .מציאת שותפים לתרגילי בית וגישה לקבוצות ווצאפ של הקורסים 
            </p>

            <p style={{textAlign:"end", fontSize: "25px"}} >?אז איך מוצאים התאמה</p>


            <p style={{textAlign:"end", fontSize: "20px"}} >
              .א. יש לחפש את הקורס אליו אתם רשומים באמצעות שם או מספר הקורס
              <br></br><br></br>
              .אם יש כזו וכן אופציות להגיש בקשה למציאת שותפים, החלפת קבוצה והחלפת קורס whatsapp-ב. בעמוד הקורס תוכלו למצוא קישור לקבוצת ה
              <br></br><br></br>
              .ג. הגישו את הבקשה בה אתם מעוניינים (לאחר שהתחברתם למערכת)
              <br></br><br></br>
              .ד. כעת תורנו לעבוד על למצוא התאמה עבורכם
              .ברגע שתמצא התאמה יישלח אליכם מייל המציין זאת ואופציית הצ׳אט תפתח
              <br></br><br></br>
              .ה. במידה וההתאמה מוצלחת תוכלו לסגור את הטיפול בבקשה
            </p>

            <p style={{ textAlign:"center", fontSize: "25px" }}>!בהצלחה</p>
            <p style={{textAlign:"end", fontSize: "20px"}} >
              <span style={{fontWeight:"bold", color:"#1b3d3c" }}>
               שימו לב:
              </span>
              <span> </span>
             המערכת הינה כלי עזר בלבד
            <br></br>
            .כל פעולה אל מול האוניברסיטה מתבצעת בכלים שהיא מספקת ואין לה קשר לאתר זה
            </p>
            
            <button style={{display:"flex", justifyContent:"flex-start"}} className="button button1" onClick={closeModal2}>סגור</button>

        </div> 
        </Modal>
    </div>
  );
}

export default NavBar;
