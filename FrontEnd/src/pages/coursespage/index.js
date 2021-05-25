import {React,useEffect, useState} from 'react';
import '../../App.css';
import {Route, Redirect, useHistory} from 'react-router-dom'
import Modal from 'react-modal';
import whatsapp from '../../images/whatsapp.png'
import {CreatePartnerRequest} from '../../functions/serverfunction'
import {CreateCourseRequest} from '../../functions/serverfunction'
import {CreateGroupRequest} from '../../functions/serverfunction'
import {useLocation } from "react-router-dom";



/*Request accepted Modal Style*/ 
const RequestAcceptedStyle = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor: "#d3f1ef",
      width: "300px",
      height: "150px",
      margin: "30px auto",
    }
  };

  /*Whatsapp Modal Style*/
  const WhatsappStyle = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor: "#d3f1ef",
      width: "500px",
      height: "100px",
      margin: "30px auto",
    }
  };

function Courses() {

  const [semester, SetSemester] = useState("");
  const [course, SetCourse] = useState("");

  const location = useLocation();
  
  const [coursename,SetNameCourse] = useState("");
  const [coursenumber,SetNumberCourse] = useState("");
  const [grpcount,Setgrpcount] = useState("");
  const [reqgrpcount,Setreqgrpcount] = useState("");
  const [partnerresponse,Setpartnerresponse] = useState("");
  const [reqcourseid,Setreqcourseid] = useState("");
  const [courseresponse,Setcourseresponse] = useState("");
  const [grp,Setgrp] = useState("");
  const [reqgrp,Setreqgrp] = useState("");
  const [groupresponse,Setgroupresponse] = useState("");


  useEffect(() => {
      console.log(location.state);
      SetSemester(location.state.semester);
      SetNameCourse(location.state.item.course);
      SetNumberCourse(location.state.item.number);
        if (localStorage.getItem("coursenumber")){
          SetNumberCourse(localStorage.getItem("coursenumber"));
          if (!localStorage.getItem("coursename")){
              SetNameCourse("");
          }
        }
        if (localStorage.getItem("coursename")){
          SetNameCourse(localStorage.getItem("coursename"));
          if (!localStorage.getItem("coursenumber")){
            SetNumberCourse("");
        }
        }
  }, []);


  const history = useHistory();
  const [partnermodalIsOpen,partnersetIsOpen] = useState(false);
  const [coursemodalIsOpen,coursesetIsOpen] = useState(false);
  const [groupmodalIsOpen,groupsetIsOpen] = useState(false);
  const [modal1IsOpen,setIsOpen1] = useState(false);

  async function OnClickPartner (){
    //lets oprate function from function page
    let response = await CreatePartnerRequest(grpcount, reqgrpcount, course, semester);
    if (response.errormsg){
      alert(response.errormsg);
    }
    else{
      if (response && response == true){
        Setpartnerresponse("הוגש בהצלחה")
      }
      else{
        Setpartnerresponse("טעות בהזנת הבקשה. אנא נסה שנית")
      }
      partnersetIsOpen(true);
    }
}

async function OnClickCourse (){
  //lets oprate function from function page
  let response = await CreateCourseRequest(reqcourseid, course, semester);
  if (response.errormsg){
    alert(response.errormsg);
  }
  else{
    if (response && response == true){
      Setcourseresponse("הוגש בהצלחה")
    }
    else{
      Setcourseresponse("טעות בהזנת הבקשה. אנא נסה שנית")
    }
    coursesetIsOpen(true);
  }
}

async function OnClickGroup (){
  //lets oprate function from function page
  let response = await CreateGroupRequest(grp, reqgrp, course, semester);
  if (response.errormsg){
    alert(response.errormsg);
  }
  else{
    if (response && response == true){
      Setgroupresponse("הוגש בהצלחה")
    }
    else{
      Setgroupresponse("טעות בהזנת הבקשה. אנא נסה שנית")
    }
    groupsetIsOpen(true);
  }
}

  function openpartnerModal(){
    partnersetIsOpen(true);
  }

  function opencourseModal(){
    coursesetIsOpen(true);
  }

  function opengroupModal(){
    groupsetIsOpen(true);
  }


  function openModal1(){
    setIsOpen1(true);
  }

  function closepartnerModal(){
    partnersetIsOpen(false);
  }

  function closecourseModal(){
    coursesetIsOpen(false);
  }

  function closegroupModal(){
    groupsetIsOpen(false);
  }

  function closeModal1(){
    setIsOpen1(false);
  }

  function Redirect(page){

    history.push("/"+page);
    return <Redirect    to={{
      pathname:'/'+page
        }}/>
  }
  
  return (

    <div className="Home">
      <div className="line">
        <div style={{fontSize: '14px'}}>מעודכן לתשפ"א</div>
        <div>קורס {coursename}: {coursenumber}</div>
      </div>
      <div className="line">
         <div>
           <button onClick={() => {openModal1()}} className="whatsappbutton"><img className="whatsapp" alt="whatsapp" src={whatsapp}  /></button>
         </div>
        {semester == "A" ? "סמסטר א" : "סמסטר ב"}
      </div>
      <div className="line">
        <div className="box">
          <div style={{fontSize: '32px'}}>מציאת שותפים</div>
          <div><input className="inputclass" value = {reqgrpcount} type ="text" pattern="\d+" onChange = {(e) => {Setreqgrpcount(e.target.value)}}></input>  גודל קבוצה מבוקש</div>
          <div><input className="inputclass" value = {grpcount} type ="text" pattern="\d*" onChange = {(e) => {Setgrpcount(e.target.value)}}></input>  גודל קבוצה נוכחי</div>
          <button onClick={() => OnClickPartner()} className="button button1">הגש בקשה</button>
        </div>
        <div className="box">
          <div style={{fontSize: '32px'}}>החלפת קבוצה</div>
          <div><input className="inputclass" value = {reqgrp} type ="text" onChange = {(e) => {Setreqgrp(e.target.value)}}></input>  מספר קבוצה מבוקש</div>
          <div><input className="inputclass" value = {grp} type ="text" onChange = {(e) => {Setgrp(e.target.value)}}></input>  מספר קבוצה נוכחי</div>
          <button onClick={() => OnClickGroup()} className="button button1">הגש בקשה</button>
        </div>
        <div className="box">
          <div style={{fontSize: '32px'}}>החלפת קורס</div>
          <div><input className="inputclass" value = {reqcourseid} onChange = {(e) => {Setreqcourseid(e.target.value)}} type ="text"
                maxlength="8" 
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }
              }
          ></input >  מספר קורס מבוקש</div>
          <div>או</div>
          <div><input className="inputclass" type ="text"></input>  שם קורס מבוקש</div>
          <button onClick={() => OnClickCourse()} className="button button1">הגש בקשה</button>
        </div>
      </div>
      <Modal
          isOpen={partnermodalIsOpen}
          onRequestClose={closepartnerModal}
          style={RequestAcceptedStyle}
          contentLabel="Example Modal"
        >
        <div className="Modal">
        <div>{partnerresponse}</div>
        <div style={{marginBottom: "15px" }}></div>
        <button className="button button1" onClick={() => closepartnerModal()}>סגור</button>
        </div>
        </Modal>

        <Modal
          isOpen={coursemodalIsOpen}
          onRequestClose={closecourseModal}
          style={RequestAcceptedStyle}
          contentLabel="Example Modal"
        >
        <div className="Modal">
        <div>{courseresponse}</div>
        <div style={{marginBottom: "15px" }}></div>
        <button className="button button1" onClick={() => closecourseModal()}>סגור</button>
        </div>
        </Modal>

        <Modal
          isOpen={groupmodalIsOpen}
          onRequestClose={closegroupModal}
          style={RequestAcceptedStyle}
          contentLabel="Example Modal"
        >
        <div className="Modal">
        <div>{groupresponse}</div>
        <div style={{marginBottom: "15px" }}></div>
        <button className="button button1" onClick={() => closegroupModal()}>סגור</button>
        </div>
        </Modal>

        <Modal
          isOpen={modal1IsOpen}
          onRequestClose={closeModal1}
          style={WhatsappStyle}
          contentLabel="Example Modal"
        >
        <div className="Modal2">
        <a href="https://chat.whatsapp.com/H5B0nQWQ3DE7FTeDRIPB2h" rel="noopener noreferrer" target="_blank">Join Whatsapp Group</a>
        {/* <div> onClick="https://chat.whatsapp.com/H5B0nQWQ3DE7FTeDRIPB2h"</div> */}
        <div style={{marginBottom: "15px" }}></div>
        <button className="button button1" onClick={closeModal1}>סגור</button>
        </div>
        </Modal>

    </div>
  );
}

export default Courses;