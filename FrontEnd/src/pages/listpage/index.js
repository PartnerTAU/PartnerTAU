import { React, useEffect, useState } from "react";

import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import IconButton from '@material-ui/core/IconButton';
import { grey } from '@material-ui/core/colors';
import ChatIcon from '@material-ui/icons/Chat';

import "../../App.css";
import { Route, Redirect, useHistory } from "react-router-dom";
import {
  GetAllRequests,
  GetMatchChatGroup,
  InsertChatOnMatchGroup,
  RemoveGroupRequest,
  CheckForNewMatchGroup,
  RemovePartnerRequest,
  GetMatchChatPartner,
  InsertChatOnMatchPartner,
  CheckForNewMatchPartner,
  RemoveCourseRequest,
  InsertChatOnMatchCourse,
  GetMatchChatCourse,
  CheckForNewMatchCourse
} from "../../functions/serverfunction";
import { getOpenRequests } from "../../functions/courseRequest";
import Modal from "react-modal";
import Moment from "moment";

import swal from "sweetalert";

function List() {
  const RequestAcceptedStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      // backgroundColor: "#f5fdfd",
      backgroundColor: "#f7fcfc",
      minWidth: "30%",
      height: "350px",
      margin: "30px auto",
    },
  };
  const RequestAcceptedStyleDelete = {
    content: {
      top: "30%",
      left: "30%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-30%, -30%)",
      //backgroundColor: "#f5fdfd",
      backgroundColor: "#f7fcfc",
      minWidth: "30%",
      height: "200px",
      // margin: "30px auto",
    },
  };

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#d3f1ef',
      color: 'black',
      boxShadow: theme.shadows[1],
      fontSize: 18,
      fontFamily: 'Calibri'
    },
  }))(Tooltip);


  const [requests, setRequest] = useState([]);
  const [chatText, setChatText] = useState("");
  const [courseName, setCourseName] = useState("");
  const [typeOfRequest, setTypeOfRequest] = useState("");
  const [itemid, setItemid] = useState("");
  const [itemtype, setItemtype] = useState("");
  const [matchIdBySet, setMatchId] = useState(-1);
  const [modalChat, setModalChat] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [cancelRequest, setcancelRequest] = useState(false);
  const [chats, setChats] = useState([]);
  
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
  
  useEffect(async () => {
    setRequest((prevArray) => []);
    let x = await GetAllRequests();
    if (x.errormsg) {
      swal({
        title: "שגיאה",
        text: "יש להתחבר למערכת על מנת לצפות בבקשות שלך",
        icon: "warning",
        dangerMode: true,
        className: "bodyAlert",
        button: {
          text: "סגור",
          className: "button1",
        },
      });
	  Redirect("Home");
    } else {
      x.map((item, k) => setRequest((oldArray) => [...oldArray, item]));

      //x.map( a =>  setRequest((oldArray) => [...oldArray, a]));
    }
  }, []);

  const history = useHistory();

  function closeModal() {
    setModalChat(false);
    setTypeOfRequest("")
    setChats([]);
    setCourseName("")
  }

  function openModalDelete(itemidvalue, itemtypevalue){
    setModalDelete(true);
    setItemid(itemidvalue);
    setItemtype(itemtypevalue);
  }

  function closeModalDeleteCancel() {
    setModalDelete(false);
    setcancelRequest(true);
  }

  function closeModalDelete() {
    setModalDelete(false);
  }

  async function RemoveRequest(id,type){
    setcancelRequest(false);
    let req = {
      id : id
    }
    if(type === 'group')
    {
      
        let rem = await RemoveGroupRequest(req)
        if(rem && rem === true)
        {
          let x = await GetAllRequests();
          setRequest((prevArray) => []);
          x.map((item, k) => setRequest((oldArray) => [...oldArray, item]));
        }

    }
    else if(type === 'partner')
    {
      let rem = await RemovePartnerRequest(req)
        if(rem && rem === true)
        {
          let x = await GetAllRequests();
          setRequest((prevArray) => []);
          x.map((item, k) => setRequest((oldArray) => [...oldArray, item]));
        }
    }
    else if(type === 'course')
    {
      let rem = await RemoveCourseRequest(req)
        if(rem && rem === true)
        {
          let x = await GetAllRequests();
          setRequest((prevArray) => []);
          x.map((item, k) => setRequest((oldArray) => [...oldArray, item]));
        }
    }
    setItemid("");
    setItemtype("");
  }

  async function FindNewMatch(id,type){

    let req = {
      id : id
    }
    if(type === 'group')
    {
      
        let rem = await CheckForNewMatchGroup(req)
       

    }
    else if(type === 'partner')
    {
      
        let rem = await CheckForNewMatchPartner(req)
       

    }
    else if(type === 'course')
    {
      
        let rem = await CheckForNewMatchCourse(req)
       

    }


    let x = await GetAllRequests();
    setRequest((prevArray) => []);
    x.map((item, k) => setRequest((oldArray) => [...oldArray, item]));

  }

  async function GetChats(matchId,type,coursename) {
    setChats((prevArray) => []);
    setCourseName(coursename)
    if (matchId && matchId > 0) {
      if(type === 'group')
      {
        setTypeOfRequest('group')
        setMatchId(matchId)
        let x = await GetMatchChatGroup(matchId);
        x.map((item, k) => setChats((oldArray) => [...oldArray, item]));
      }
      else if(type === 'partner')
      {
        setTypeOfRequest('partner')
        setMatchId(matchId)
        let x = await GetMatchChatPartner(matchId);
        x.map((item, k) => setChats((oldArray) => [...oldArray, item]));
      }
      else if(type === 'course')
      {
        setTypeOfRequest('course')
        setMatchId(matchId)
        let x = await GetMatchChatCourse(matchId);
        x.map((item, k) => setChats((oldArray) => [...oldArray, item]));
      }
      setModalChat(true);
    }
  }

  async function AddMessage() {

    if(chatText.length > 0)
    {

      let req = {
        matchId : matchIdBySet,
        message : chatText,
        coursename : courseName
      }
      if (matchIdBySet && matchIdBySet > 0) {
  
        if(typeOfRequest === 'group')
        {
          let x = await InsertChatOnMatchGroup(req);
          setChatText("")
          await GetChats(matchIdBySet,typeOfRequest,courseName)
        }
        else if(typeOfRequest === 'partner')
        {
          let x = await InsertChatOnMatchPartner(req);
          setChatText("")
          await GetChats(matchIdBySet,typeOfRequest,courseName)
        }
        else if(typeOfRequest === 'course')
        {
          let x = await InsertChatOnMatchCourse(req);
          setChatText("")
          await GetChats(matchIdBySet,typeOfRequest,courseName)
        }
        
      }
    }
  }

  const useStyles = makeStyles((theme) => ({
    Chat_able:{
      color:'#30918c', 
      fontSize: 30, 
      marginRight: 5,
      marginLeft:5,
      [theme.breakpoints.down(1001)]:{
        fontSize: 25,
      },
      [theme.breakpoints.down(741)]:{
        fontSize: 20,
      },
      [theme.breakpoints.down(601)]:{
        fontSize: 15,
      },
      [theme.breakpoints.down(451)]:{
        fontSize: 12,
      },
    },
    Chat_Disable:{
      color: grey[150],
      fontSize: 30,
      marginRight: 5, 
      marginLeft:5,
      [theme.breakpoints.down(1001)]:{
        fontSize: 25,
      },
      [theme.breakpoints.down(741)]:{
        fontSize: 20,
      },
      [theme.breakpoints.down(601)]:{
        fontSize: 15,
      },
      [theme.breakpoints.down(451)]:{
        fontSize: 12,
      },
    }
  }));

  const classes = useStyles();

  return (
    <div className="Home">
      <div className="websiteTitle" style={{marginBottom: "30px" }}>
        הבקשות שלי
      </div>
      <table>
        <thead>
          <tr>
            <th>הסרת בקשה</th>
            <th>צ'אט</th>
            <th>סטטוס</th>
            <th>סוג בקשה</th>
            <th>סמסטר</th>
            <th>שם קורס</th>
            <th>מספר קורס</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((item, k) => (
            <tr>
              <td>
                <button onClick={() => openModalDelete(item.id, item.type)} className="buttonclose button1" >הסר</button>
                {cancelRequest ? RemoveRequest(itemid, itemtype):""}
                {item.status === 'ממתין לפעולתך' ? <button onClick={() => FindNewMatch(item.id,item.type)} className="buttonclose button1">התאמה חדשה</button> : ""}
              </td>
              {/* <td onClick={() => GetChats(item.matchId,item.type,item.courseName)}>צ'אט</td> */}
              <td>
                {item.matchId && item.matchId != "" ? (
                <LightTooltip title="פתח צאט" placement="bottom">
                <IconButton onClick={() => GetChats(item.matchId,item.type,item.courseName)}>
                  <ChatIcon className={classes.Chat_able}>
                  </ChatIcon>
                </IconButton>
                </LightTooltip>
                // <IconButton onClick={signOut}>
                //   <PowerSettingsNewIcon
                //     style={{color: grey[50], fontSize: 45, marginRight: 5, marginLeft:5}}>
                //   </PowerSettingsNewIcon>
                // </IconButton>
                  // <button onClick={signOut} className="button button1">
                  //   התנתק
                  // </button>
                ) : (
                  <IconButton disabled>
                    <ChatIcon className={classes.Chat_Disable}>
                    </ChatIcon>
                  </IconButton>
                )}
              </td>
              <td>{item.status}</td>
              <td>{item.requestType}</td>
              <td>{item.semester}</td>
              <td>{item.courseName}</td>
              <td>{item.courseNum}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalChat}
        onRequestClose={closeModal}
        style={RequestAcceptedStyleDelete}
        contentLabel="Example Modal"
      >
        
        <div style={{position:'relative'}} >
        <div>
         <button onClick={closeModal} className="buttonclose button1">X</button> 
        </div>
        <div>
          {chats &&
            chats.map((item, k) => (
              <div>
                {item.isMe ? (
                  <div style={{ textAlign: "right"}}>
                    <div  className="chatmassage1">{item.message}</div>
                    <div className="catedate">
                      {Moment(item.creationDate).format("d MMM HH:mm:ss")}
                    </div>
                    {/* <div style={{ fontSize: "10px", color: "gray" }}>אני</div> */}
                  </div>
                ) : (
                  <div style={{ textAlign: "left"}}>
                    <div className="chatmassage2">{item.message}</div>
                    <div className="catedate">
                      {Moment(item.creationDate).format("d MMM HH:mm:ss")}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>




          <div
            style={{
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "right",
            }}
          >
            <div style={{ fontSize: "18px", width:"75%" }}>
              <textarea placeholder="...הקלד הודעה"  rows="3"
               value = {chatText}
                onChange={(e) => {
                  setChatText(e.target.value);
                }}
                style={{ width: "100%" }}
                class="inputclass"
              />
            </div>

            <button onClick={AddMessage} className="buttonclose button1">שלח</button>
          </div>
          <div onClick={() => {GetChats(matchIdBySet,typeOfRequest,courseName)}} style={{position:'absolute', right:'5px', bottom: '3px', fontSize: "10px", color: "gray"}}>רענן צ'אט</div>
        </div>
      </Modal>

      <Modal
        isOpen={modalDelete}
        onRequestClose={closeModalDelete}
        style={RequestAcceptedStyle}
        contentLabel="Example Modal"
      >
        <div className="ModalReq">
          <div>?האם אתה בטוח שברצונך להסיר את הבקשה</div>
          <div style={{ marginBottom: "15px" }}></div>
          <button className="button button1" onClick={() => closeModalDelete()}>
            ביטול
          </button>
          <button className="button button1" onClick={() => closeModalDeleteCancel()}>
            אישור
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default List;