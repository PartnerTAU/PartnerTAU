import logo from "../../images/logo.png";
import { React, useEffect, useState } from "react";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';

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
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ListIcon from '@material-ui/icons/List';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import Grid from '@material-ui/core/Grid';

import Modal from "react-modal";
import { merge } from "rxjs";

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
    width: "50%",
    // height: "45%",
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

      if(localStorage.getItem("user"))
      {

        setUsername(localStorage.getItem("user"));

      }
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
  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#d3f1ef',
      color: 'black',
      boxShadow: theme.shadows[1],
      fontSize: 18,
      fontFamily: 'Calibri'
    },
  }))(Tooltip);

  const useStyles = makeStyles((theme) => ({
    button_List:{
      fontSize: 55,
      color: grey[50],
      marginRight: 5,
      marginLeft: 5,
      [theme.breakpoints.down(830)]:{
        fontSize:50,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(741)]:{
        fontSize:35,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(575)]:{
        fontSize:25,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(501)]:{
        fontSize:22,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(416)]:{
        fontSize:17,
        marginRight: 0,
        marginLeft: 0,
      },
    },
    button_LoginOut:{
      fontSize: 45,
      color: grey[50],
      marginRight: 5,
      marginLeft: 5,
      [theme.breakpoints.down(830)]:{
        fontSize:40,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(741)]:{
        fontSize:30,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(575)]:{
        fontSize:20,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(501)]:{
        fontSize:17,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(416)]:{
        fontSize:12,
        marginRight: 0,
        marginLeft: 0,
      },
    },
    button_Hone:{
      fontSize: 50,
      color: grey[50],
      marginRight: 5,
      marginLeft: 5,
      [theme.breakpoints.down(830)]:{
        fontSize:45,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(741)]:{
        fontSize:35,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(575)]:{
        fontSize:25,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(501)]:{
        fontSize:22,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(416)]:{
        fontSize:17,
        marginRight: 0,
        marginLeft: 0,
      },
    },
    button_InfoContact:{
      fontSize: 40,
      color: grey[50],
      marginRight: 5,
      marginLeft: 5,
      [theme.breakpoints.down(830)]:{
        fontSize:35,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(741)]:{
        fontSize:30,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(575)]:{
        fontSize:20,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(501)]:{
        fontSize:17,
        marginRight: 0,
        marginLeft: 0,
      },
      [theme.breakpoints.down(416)]:{
        fontSize:12,
        marginRight: 0,
        marginLeft: 0,
      },
    },
  }));

  const classes = useStyles();


  return (
    <div className="Home">
      <div className="Top">
      <Grid
        container fixed
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        {username && username != "" ? (
          <LightTooltip title="התנתק" placement="bottom">
            <IconButton onClick={signOut} >
              <PowerSettingsNewIcon className={classes.button_LoginOut}>
              </PowerSettingsNewIcon>
            </IconButton>
          </LightTooltip>
          ) : (
          <LightTooltip title="התחבר" placement="bottom">
          <IconButton onClick={openModal}>
            <PersonOutlineOutlinedIcon className={classes.button_LoginOut}>
            </PersonOutlineOutlinedIcon>
          </IconButton>
          </LightTooltip>
          )}

          <LightTooltip title="רשימת הבקשות שלי" placement="bottom">
            <IconButton onClick={() =>  Redirect("List")}>
            <ListIcon className={classes.button_List}>
            </ListIcon>
            </IconButton>
          </LightTooltip>

          <LightTooltip title="דף בית" placement="bottom">
          <IconButton onClick={() =>  Redirect("Home")}>
            <HomeOutlinedIcon className={classes.button_Hone}>
            </HomeOutlinedIcon>
          </IconButton>
          </LightTooltip>

        </Grid>

        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"        
        >
          <div className="row">
            <p style={{color: "white"}}>
            !
            </p>
            <p style={{marginRight: 15, color: "white"}}>
              <apan>שלום</apan>
              <span> </span>
              <span>{username && username != "" ? username : ""} </span>
            </p>
          </div>

          <LightTooltip title="צור קשר" placement="bottom">
            <IconButton onClick={openModal1}>
              <MailOutlineRoundedIcon className={classes.button_InfoContact}>              
              </MailOutlineRoundedIcon>
            </IconButton>
          </LightTooltip>

          <LightTooltip title="אודות" placement="bottom">
            <IconButton onClick={openModal2}>
            <InfoOutlinedIcon className={classes.button_InfoContact}>              
            </InfoOutlinedIcon>
            </IconButton>
          </LightTooltip>

          <img src={logo} alt="Logo" className="img"/>
        </Grid>
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
            <p className="abouttitle">צור קשר</p>
            <br></br>
            <div className="row" style={{width: '100%'}}>
              <input className="ContactInput" type ="text" style={{width: '50%'}}></input>
              <p className="abouttext">שם מלא</p>
            </div>
            <div className="row" style={{width: '100%'}}>
              <input className="ContactInput" type ="text" style={{width: '50%'}}></input>
              <p className="abouttext">כתובת מייל</p>
            </div>
            <div className="row" style={{width: '100%'}} >
              <input className="ContactInput" type ="text" style={{width: '50%'}}></input>
              <p className="abouttext">נושא</p>
            </div>
            <div className="row" style={{width: '100%'}}>
              <textarea className="ContactInput" type ="text" style={{width: '50%', height:"40px"}}></textarea>
              <p className="abouttext">גוף ההודעה</p>
            </div>
            <br></br>
             
            <div className="row" style={{ justifyContent:"center"}}>
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
            <p  className="abouttitle">
              <span> PartnerTau </span>
              <br></br>
              הוא כלי עזר להחלפת קורסים, קבוצות בקורסים, מציאת שותפים לתרגילי בית וגישה לקבוצות ווצאפ של הקורסים 
            </p>

            <p className="abouttext" >?אז איך מוצאים התאמה</p>


            <p className="abouttext" >
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

            <p className="goodlack">!בהצלחה</p>
            <p className="abouttext">
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