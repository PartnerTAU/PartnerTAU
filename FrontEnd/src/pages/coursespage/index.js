import { React, useEffect, useState } from "react";
import "../../App.css";
import { Route, Redirect, useHistory } from "react-router-dom";
import Modal from "react-modal";
import whatsapp from "../../images/whatsapp.png";
import {
  CreateGroupRequest,
  GetCourseGroupByNameAndSemester,
  CreateCourseRequest,
  CreatePartnerRequest,
  GetCourseAutoComplete,
  GetWhatsapp,
  UpdateWhatsapp,
  InsertWhatsapp
} from "../../functions/serverfunction";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";

import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import IconButton from "@material-ui/core/IconButton";
import { green } from "@material-ui/core/colors";
import SyncOutlinedIcon from "@material-ui/icons/SyncOutlined";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { withStyles, makeStyles } from '@material-ui/core/styles';

const RequestAcceptedStyle = {
  content: {
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d3f1ef",
    width: "60%",
  },
};

const WhatsappStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d3f1ef",
    width: "50%",
    margin: "40px auto",
  },
};

function Courses() {
  const [semester, SetSemester] = useState("");
  const location = useLocation();

  const [coursename, SetNameCourse] = useState("");
  const [coursenumber, SetNumberCourse] = useState("");
  const [coursenameautocomplete, SetNameCourseAutoComplete] = useState("");
  const [coursenumberautocomplete, SetNumberCourseAutoComplete] = useState("");
  const [grpcount, Setgrpcount] = useState("");
  const [reqgrpcount, Setreqgrpcount] = useState("");
  const [partnerresponse, Setpartnerresponse] = useState("");
  const [reqcourseid, Setreqcourseid] = useState("");
  const [courseresponse, Setcourseresponse] = useState("");
  const [grpnum, SetgrpNum] = useState("");
  const [grp, Setgrp] = useState("");
  const [reqgrp, Setreqgrp] = useState("");
  const [groupresponse, Setgroupresponse] = useState("");
  const [groupBySemester, SetGroupBySemester] = useState([]);
  const history = useHistory();
  const [partnermodalIsOpen, partnersetIsOpen] = useState(false);
  const [coursemodalIsOpen, coursesetIsOpen] = useState(false);
  const [groupmodalIsOpen, groupsetIsOpen] = useState(false);
  const [modal1IsOpen, setIsOpen1] = useState(false);
  const [coursesAutoComplete, setCoursesAutoComplete] = useState([]);
  const [itemSelectedAuoComplete, SetItemSelectedAuoComplete] = useState({});
  const [whatsappLink, SetWhatsappLink] = useState({});
  const [editWhatsappLink, SetEditWhatsappLink] = useState(false);
  const [newWhatsappLink, SetNewWhatsappLink] = useState("");
  const [newWhatsappLinkMode, SetNewWhatsappLinkMode] = useState(false);
  const [showBottun, SetShowBottun] = useState (false);


  useEffect(async () => {
    console.log(location.state);
    SetSemester(location.state.semester);

    SetNameCourse(location.state.item.course);
    SetNumberCourse(location.state.item.number);
    let reqSemesterGroup = {
      name: location.state.item.course,
      semester: location.state.semester,
    };
    var grpBySemeter = await GetCourseGroupByNameAndSemester(reqSemesterGroup);
    if (grpBySemeter) {
      grpBySemeter.map((item, k) =>
        SetGroupBySemester((oldArray) => [...oldArray, item.group])
      );
    }
    if (localStorage.getItem("coursenumber")) {
      SetNumberCourse(localStorage.getItem("coursenumber"));
      if (!localStorage.getItem("coursename")) {
        SetNameCourse("");
      }
    }
    if (localStorage.getItem("coursename")) {
      SetNameCourse(localStorage.getItem("coursename"));
      if (!localStorage.getItem("coursenumber")) {
        SetNumberCourse("");
      }
    }
  }, []);



  async function getCoursesByTerm(text, type) {
    if (text.target.value.length != 0){
      if (type === "????") {
        SetNameCourseAutoComplete(text.target.value);
        SetNumberCourseAutoComplete("")
      }
      else{
        SetNumberCourseAutoComplete(text.target.value);
        SetNameCourseAutoComplete("")
      } 
    }
    else{
      SetNumberCourseAutoComplete("");
      SetNameCourseAutoComplete("");
      setCoursesAutoComplete([]);
    }
    SetItemSelectedAuoComplete({})

    if (text.target.value.length > 2) {
      var ret = await GetCourseAutoComplete(text.target.value,semester);
      setCoursesAutoComplete((prevArray) => []);
      if (ret && ret.length > 0) {
        ret.map((item, k) =>
          setCoursesAutoComplete((oldArray) => [...oldArray, item])
        );
      }
    }
    else{
      setCoursesAutoComplete([]);
    }
  }

  const setCourseByName = (e, k) => {
    let item = coursesAutoComplete.filter(
      (a) =>
        a.course ==
        document.getElementById("CourseName" + k).getAttribute("value")
    )[0];

    SetNumberCourseAutoComplete(item.number);
    SetItemSelectedAuoComplete(item)
    SetNameCourseAutoComplete(
      document.getElementById("CourseName" + k).getAttribute("value")
    );

    setCoursesAutoComplete((prevArray) => []);
  };

  const setCourseByNumber = (e, k) => {
    let item = coursesAutoComplete.filter(
      (a) =>
        a.number ==
        document.getElementById("CourseNumber" + k).getAttribute("value")
    )[0];
    SetItemSelectedAuoComplete(item)
    SetNameCourseAutoComplete(item.course);

    SetNumberCourseAutoComplete(
      document.getElementById("CourseNumber" + k).getAttribute("value")
    );

    setCoursesAutoComplete((prevArray) => []);
  };

  async function OnClickEditWhatsapp(id) {
    let body = {id:id, link:newWhatsappLink};
    let response = await UpdateWhatsapp(body);
    if (response.errormsg) {
      swal({
        title: "??????????",
        text: "???? ???????????? ???????????? ?????? ?????????? ???????????? ???????????? ??????????",
        icon: "warning",
        dangerMode: true,
        className: "bodyAlert",
        button: {
          text: "????????",
          className: "button1",
        },
      });
    } 
    SetEditWhatsappLink(false);
    SetShowBottun(false);
    SetNewWhatsappLink("");
    await openModal1();
  }

  async function OnClickAddWhatsapp() {
    let body = {coursenumber:coursenumber, semester:semester, link:newWhatsappLink};
    let response = await InsertWhatsapp(body);
    if (response.errormsg) {
      swal({
        title: "??????????",
        text: "???? ???????????? ???????????? ?????? ?????????? ?????????? ???????????? ??????????",
        icon: "warning",
        dangerMode: true,
        className: "bodyAlert",
        button: {
          text: "????????",
          className: "button1",
        },
      });
    } 
    SetNewWhatsappLinkMode(false);
    SetShowBottun (false);
    SetNewWhatsappLink("");
    await openModal1();
  }

  async function OnClickAdd(){
    SetShowBottun(true);
    SetNewWhatsappLinkMode(true);
  }

  async function OnClickEdit(){
    SetShowBottun(true);
    SetEditWhatsappLink(true);
  }


  async function OnClickPartner() {
    let response = await CreatePartnerRequest(
      grpcount,
      reqgrpcount,
      grpnum,
      coursenumber,
      coursename,
      semester
    );
    if (response.errormsg) {
      swal({
        title: "??????????",
        text: "???? ???????????? ???????????? ?????? ?????????? ???????? ????????",
        icon: "warning",
        dangerMode: true,
        className: "bodyAlert",
        button: {
          text: "????????",
          className: "button1",
        },
      });
    } else {
      if (response && response == true) {
        Setpartnerresponse(
          <div> 
            <div className="abouttitle"> ?????????? ?????????? ???????????? </div>
            <br></br>
            <div className="abouttext">?????????? ?????????? ???? ?????????? ?????????? ??????????</div>
            <div className="abouttext"> ???????? ?????????? ?????????? ?????????? ???????? ???????? ???????????? ?????? ???????????????? ?????????? ???????? ?????? ?????????? ??????????</div>
          </div>

        );
      } else {
        Setpartnerresponse(
          <div className="abouttext">???????? ?????????? ??????????. ?????? ?????? ????????</div>
          );
      }
      partnersetIsOpen(true);
    }
  }

  async function OnClickCourse() {
    let response = await CreateCourseRequest(
      coursenumber,
      coursename,
      semester,
      coursenameautocomplete,
      coursenumberautocomplete
    );
    if (response.errormsg) {
      swal({
        title: "??????????",
        text: "???? ???????????? ???????????? ?????? ?????????? ???????? ????????",
        icon: "warning",
        dangerMode: true,
        className: "bodyAlert",
        button: {
          text: "????????",
          className: "button1",
        },
      });
    } else {
      if (response && response == true) {
        Setcourseresponse(
          <div> 
            <div className="abouttitle"> ?????????? ?????????? ???????????? </div>
            <br></br>
            <div className="abouttext">?????????? ?????????? ???? ?????????? ?????????? ??????????</div>
            <div className="abouttext"> ???????? ?????????? ?????????? ?????????? ???????? ???????? ???????????? ?????? ???????????????? ?????????? ???????? ?????? ?????????? ??????????</div>
          </div>

        );
      } else {
        Setcourseresponse(
          <div className="abouttext">???????? ?????????? ??????????. ?????? ?????? ????????</div>
          );
      }
      coursesetIsOpen(true);
    }
  }

  async function OnClickGroup() {
    if (grp === reqgrp){
        Setgroupresponse(
        <div>
        <div className="abouttext">???????? ?????????? ??????????</div>
        <br></br>
        <div className="abouttext">???? ???????? ???????? ?????????? ???? ???????? ????????????</div>
        </div>
        );
        groupsetIsOpen(true);
        return;
    }
    let response = await CreateGroupRequest(
      grp,
      reqgrp,
      coursenumber,
      coursename,
      semester
    );
    if (response.errormsg) {
      swal({
        title: "??????????",
        text: "???? ???????????? ???????????? ?????? ?????????? ???????? ????????",
        icon: "warning",
        dangerMode: true,
        className: "bodyAlert",
        button: {
          text: "????????",
          className: "button1",
        },
      });
    } else {
      if (response && response == true && grp != reqgrp) {
        Setgroupresponse(
          <div> 
            <div className="abouttitle"> ?????????? ?????????? ???????????? </div>
            <br></br>
            <div className="abouttext">?????????? ?????????? ???? ?????????? ?????????? ??????????</div>
            <div className="abouttext"> ???????? ?????????? ?????????? ?????????? ???????? ???????? ???????????? ?????? ???????????????? ?????????? ???????? ?????? ?????????? ??????????</div>
          </div>

        );
      }
      else if (response && response == true && grp == reqgrp){
        Setgroupresponse(
        <div>
        <div className="abouttext">???????? ?????????? ??????????</div>
        <br></br>
        <div className="abouttext">???? ???????? ???????? ?????????? ???? ???????? ????????????</div>
        </div>
        );
      }
      else {
        Setgroupresponse(
          <div className="abouttext">???????? ?????????? ??????????. ?????? ?????? ????????</div>
          );
      }
      groupsetIsOpen(true);
    }
  }

  async function openModal1() {
    let details = await GetWhatsapp (coursenumber, semester);
    if (details){
      SetWhatsappLink(details);
    }
    else{
      SetWhatsappLink(null);
    }
    setIsOpen1(true);
  }

  function closepartnerModal() {
    partnersetIsOpen(false);
  }

  function closecourseModal() {
    coursesetIsOpen(false);
  }

  function closegroupModal() {
    groupsetIsOpen(false);
  }

  function closeModal1() {
    setIsOpen1(false);
  }


  const useStyles = makeStyles((theme) => ({
    WhatsApp_Icon:{
      fontSize: 50,
      color: green[500],
      [theme.breakpoints.down(741)]:{
        fontSize:45,
      },
    },
    Other_Icon:{
      fontSize: 50,
      marginRight: 15,
      [theme.breakpoints.down(741)]:{
        fontSize: 40,
        marginRight: 10,

      },
      [theme.breakpoints.down(416)]:{
        fontSize: 30,
        marginRight: 8,
      },
    },
    listbox: {
      width: 300,
      margin: 0,
      padding: 0,
      // zIndex: 1,
      fontSize: '20px',
      position: 'absolute',
      listStyle: 'none',
      backgroundColor: 'white',
      overflow: 'auto',
      maxHeight: 65,
      border: '1px solid rgba(0,0,0,.25)',
      '& li[data-focus="true"]': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
      },
      '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
      },
      [theme.breakpoints.down(740)]:{
        fontSize: '18px',
        maxHeight: 55,
      },
      [theme.breakpoints.down(560)]:{
        fontSize: '15px',
        maxHeight: 50,
        width: 210,
      },
      [theme.breakpoints.down(415)]:{
        fontSize: '12px',
        width: 200,
      },
    },

  }));

  const classes = useStyles();


  return (
    <div className="Home">
      <div className="line" style={{ width: "90%" }}>
        <div style={{ fontSize: "14px" }}>???????????? ????????"??</div>
        <div>
          ???????? {coursename}: {coursenumber}
        </div>
      </div>
      <div className="line" style={{ width: "90%" }}>
        <div>
          <IconButton
            onClick={() => {
              openModal1();
            }}
          >
          <WhatsAppIcon className={classes.WhatsApp_Icon}>
            </WhatsAppIcon>
          </IconButton>
        </div>
        {semester == "A" ? "?????????? ??" : "?????????? ??"}
      </div>
      <div className="line" style={{ width: "90%" }}>
        <div className="box2">
        <div className="row">
            <div>
              <SyncOutlinedIcon className={classes.Other_Icon}>
              </SyncOutlinedIcon>
            </div>
            <div className="RequestTitle">
            ?????????? ????????
            </div>
          </div>
          <div style={{ fontSize: "16px" }}>?????????? ???????? ???????????? ?????????? ???????? </div>
          <div>
            <input
             onChange={(e) => {getCoursesByTerm(e, "????????");}} 
              className="inputclass"
              value={coursenumberautocomplete}

              type="text"
              maxlength="9"
              onKeyPress={(event) => {
                if (!/[0-9,-]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            ></input >{" "}
            ???????? ???????? ??????????
          </div>
          <div>
                {coursesAutoComplete.length > 0 && (
                  <div className="AutolistStyle">
                    <ul className={classes.listbox}>
                      {coursesAutoComplete.map((item, k) => (
                        <li
                          id={"CourseNumber" + k}
                          value={item.number}
                          onClick={(e) => {
                            setCourseByNumber(e, k);
                          }}
                        >
                          <a>{item.number}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
          <div>????</div>
          <div>
            <input value={coursenameautocomplete} onChange={(e) => {getCoursesByTerm(e, "????");}} className="inputclass" 
            type="text"></input> ???? ???????? ??????????
          </div>
          <div>
                {coursesAutoComplete.length > 0 && (
                  <div className="AutolistStyle2">
                    <ul className={classes.listbox}>
                      {coursesAutoComplete.map((item, k) => (
                        <li
                          id={"CourseName" + k}
                          value={item.course}
                          onClick={(e) => {
                            setCourseByName(e, k);
                          }}
                        >
                          <a>{item.course}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
          <button onClick={() => OnClickCourse()} className="button button1">
            ?????? ????????
          </button>
        </div>
        <div className="box3">
        <div className="row">
            <div>
            <GroupAddIcon className={classes.Other_Icon}>
            </GroupAddIcon>
            </div>
            <div className="RequestTitle">
            ?????????? ????????????
            </div>
          </div>
          <div>
            <input
              className="inputclass"
              value={reqgrpcount}
              type="text"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => {
                Setreqgrpcount(e.target.value);
              }}
            ></input>{" "}
            ???????? ?????????? ??????????
          </div>
          <div>
            <input
              className="inputclass"
              value={grpcount}
              type="text"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => {
                Setgrpcount(e.target.value);
              }}
            ></input>{" "}
            ???????? ?????????? ??????????
          </div>
          <div>
           
            <select className="box-select"
              
              onChange={(e) => {
                SetgrpNum(e.target.value);
              }}
            >
              <option value="0"></option>
              {groupBySemester.map((fbb) => (
                <option value={fbb}>{fbb}</option>
              ))}
              ;
            </select>
            ???????? ?????????? (?????????? ????????????????)
          </div>
          <button onClick={() => OnClickPartner()} className="button button1">
            ?????? ????????
          </button>
          
        </div>
        <div className="box2">
        <div className="row">
            <div>
            <ScheduleIcon className={classes.Other_Icon}>
            </ScheduleIcon>
            </div>
            <div className="RequestTitle">
            ?????????? ??????????
            </div>
          </div>
          <div>
          <select className="box-select"
              onChange={(e) => {
                Setreqgrp(e.target.value);
              }}
            >
              <option value="0"></option>
              {groupBySemester.map((fbb) => (
                <option value={fbb}>{fbb}</option>
              ))}
              ;
            </select>
            ???????? ?????????? ??????????
          </div>
          <div>
          <select className="box-select"
              onChange={(e) => {
                Setgrp(e.target.value);
              }}
            >
              <option value="0"></option>
              {groupBySemester.map((fbb) => (
                <option value={fbb}>{fbb}</option>
              ))}
              ;
            </select>
            ???????? ?????????? ??????????
          </div>
          <button onClick={() => OnClickGroup()} className="button button1">
            ?????? ????????
          </button>
        </div>
      </div>
      <Modal
        isOpen={partnermodalIsOpen}
        onRequestClose={closepartnerModal}
        style={RequestAcceptedStyle}
        contentLabel="Example Modal"
      >
        <div className="ModalReq">
          <div>{partnerresponse}</div>
          <div style={{ marginBottom: "15px" }}></div>
          <button
            className="button button1"
            onClick={() => closepartnerModal()}
          >
            ????????
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={coursemodalIsOpen}
        onRequestClose={closecourseModal}
        style={RequestAcceptedStyle}
        contentLabel="Example Modal"
      >
        <div className="ModalReq">
          <div>{courseresponse}</div>
          <div style={{ marginBottom: "15px" }}></div>
          <button className="button button1" onClick={() => closecourseModal()}>
            ????????
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={groupmodalIsOpen}
        onRequestClose={closegroupModal}
        style={RequestAcceptedStyle}
        contentLabel="Example Modal"
      >
        <div className="ModalReq">
          <div>{groupresponse}</div>
          <div style={{ marginBottom: "15px" }}></div>
          <button className="button button1" onClick={() => closegroupModal()}>
            ????????
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={modal1IsOpen}
        onRequestClose={closeModal1}
        style={WhatsappStyle}
        contentLabel="Example Modal"
      >
        <div className="Modal2">
          {whatsappLink && whatsappLink != null && whatsappLink.link ? <div>
            {!editWhatsappLink ? <div>
            <a
            href={whatsappLink.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            Join Whatsapp Group
          </a>
            </div>:""}
          {editWhatsappLink ? <div><input type ="text" value = {newWhatsappLink} onChange ={(e) => {SetNewWhatsappLink(e.target.value);}}> 
            </input>  </div>:""}
          </div>:<div>{!newWhatsappLinkMode ? <div className="abouttext">?????? ???????? ?????????? ???????????? ???? ??????????</div>:""}{newWhatsappLinkMode ? <div><input type ="text" value = {newWhatsappLink} onChange ={(e) => {SetNewWhatsappLink(e.target.value);}}> 
            </input>  </div>:""}</div>}
         
          <div className="row" style={{ marginTop: "15px" }}>   
            <button className="button button1" onClick={closeModal1}>
              ????????
            </button>
            {whatsappLink && whatsappLink != null && whatsappLink.link && !editWhatsappLink ? <button className="button button1" onClick={() => OnClickEdit()}>
              ????????
            </button>:""}
            {!(whatsappLink && whatsappLink != null && whatsappLink.link) && !newWhatsappLinkMode ? <button className="button button1" onClick={() => OnClickAdd()}>
              ????????
            </button>:""}
            {showBottun && editWhatsappLink ? 
            <button disabled = {newWhatsappLink.length == 0} className="button button1" onClick={() => OnClickEditWhatsapp(whatsappLink.id)}>
              ??????????
            </button>:""}
            {showBottun && newWhatsappLinkMode ? <button disabled = {newWhatsappLink.length == 0} className="button button1" onClick={() => OnClickAddWhatsapp()}>
            ??????????
            </button>:""}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Courses;