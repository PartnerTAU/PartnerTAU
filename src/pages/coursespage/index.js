import {React,useEffect, useState} from 'react';
import '../../App.css';
import {Route, Redirect, useHistory} from 'react-router-dom'
import Modal from 'react-modal';
import whatsapp from '../../images/whatsapp.png'

/*Check*/
const customStyles = {
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

  const customStyles1 = {
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

  const [coursename,SetNameCourse] = useState("");
  const [coursenumber,SetNumberCourse] = useState("");

  useEffect(() => {
        if (localStorage.getItem("coursnamber")){
          SetNumberCourse(localStorage.getItem("coursnamber"));
          if (!localStorage.getItem("coursname")){
              SetNameCourse("");
          }
        }
        if (localStorage.getItem("coursname")){
          SetNameCourse(localStorage.getItem("coursname"));
          if (!localStorage.getItem("coursnamber")){
            SetNumberCourse("");
        }
        }
  }, []);


  const history = useHistory();
  const [modalIsOpen,setIsOpen] = useState(false);
  const [modal1IsOpen,setIsOpen1] = useState(false);

  function openModal(){
    setIsOpen(true);
}

  function openModal1(){
    setIsOpen1(true);
  }


  function closeModal(){
    setIsOpen(false);
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
        <div>סמסטר א</div>
      </div>
      <div className="line">
        <div className="box">
          <div style={{fontSize: '32px'}}>מציאת שותפים</div>
          <div><input type ="text"></input>  גודל קבוצה מבוקש</div>
          <div><input type ="text"></input>  גודל קבוצה נוכחי</div>
          <button onClick={() => {openModal()}} className="button button1">הגש בקשה</button>
        </div>
        <div className="box">
          <div style={{fontSize: '32px'}}>החלפת קבוצה</div>
          <div><input type ="text"></input>  מספר קבוצה מבוקש</div>
          <div><input type ="text"></input>  מספר קבוצה נוכחי</div>
          <button onClick={() => {openModal()}} className="button button1">הגש בקשה</button>
        </div>
        <div className="box">
          <div style={{fontSize: '32px'}}>החלפת קורס</div>
          <div><input type ="text"></input>  מספר קורס מבוקש</div>
          <div>או</div>
          <div><input type ="text"></input>  שם קורס מבוקש</div>
          <button onClick={() => {openModal()}} className="button button1">הגש בקשה</button>
        </div>
      </div>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div className="Modal">
        <div>בקשתך התקבלה</div>
        <div style={{marginBottom: "15px" }}></div>
        <button className="button button1" onClick={closeModal}>close</button>
      
        </div>
        </Modal>
        <Modal
          isOpen={modal1IsOpen}
          onRequestClose={closeModal1}
          style={customStyles1}
          contentLabel="Example Modal"
        >
        <div className="Modal2">
        <div>https://chat.whatsapp.com/H5B0nQWQ3DE7FTeDRIPB2h</div>
        <div style={{marginBottom: "15px" }}></div>
        <button className="button button1" onClick={closeModal1}>סגור</button>
      
        </div>
        </Modal>

    </div>
  );
}

export default Courses;