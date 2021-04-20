import logo from "../../images/logo.png";
import { React, useEffect, useState } from "react";
import "../../App.css";
import { Route, Redirect, useHistory } from "react-router-dom";
import Login from "../loginpage";
import { loginConfirmed } from "../../utils/subjects/loginSubject/loginSubject";

import Modal from "react-modal";

const customStyles = {
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

const customStyles2 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    position: "fixed",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d3f1ef",
    width: "800px",
    height: "200px",
  },
};


const customStyles1 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    position: "fixed",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d3f1ef",
    width: "400px",
    height: "300px",
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

  function signOut() {
    if (localStorage.getItem("user")) {
      //Connected
      localStorage.removeItem("user");
      setUsername("");
      Redirect("Home");
    }
  }


  return (
    <div className="Home">
      <div className="Top">
        <div>
          {username && username != "" ? (
            <button onClick={signOut} className="button button1">
              התנתק
            </button>
          ) : (
            <button onClick={openModal} className="button button1">
              התחבר
            </button>
          )}

          <button
            onClick={() => {
              Redirect("List");
            }}
            className="button button1"
          >
            רשימת הבקשות שלי
          </button>
          <button
            onClick={() => {
              Redirect("Home");
            }}
            className="button button1"
          >
            דף הבית
          </button>
        </div>
        <div className="row">
          <div>{username && username != "" ? username : ""}</div>
          <button onClick={openModal1} className="button button1">
            צור קשר
          </button>
          <button onClick={openModal2} className="button button1">
            אודות
          </button>
          
          <img src={logo} alt="Logo" />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className="buttonclose button1" onClick={closeModal}>X</button>
        <Login props={setIsOpen} />
      </Modal>
      <Modal 
          isOpen={modal1IsOpen}
          onRequestClose={closeModal1}
          style={customStyles1}
          contentLabel="Example Modal"
        >
        <div className="Modal">
          <div className="Modal2"> 
            <div style={{fontSize: "30px"}}>צור קשר</div>
            <div style={{ marginBottom: "20px" }}></div>
            <div className="row" style={{width: '100%'}}>
              <div><input type ="text2"></input></div>
              <div>שם מלא</div>
            </div>
            <div className="row" style={{width: '100%'}}>
              <div><input type ="text2"></input></div>
              <div>כתובת מייל</div>
            </div>
            <div className="row" style={{width: '100%'}}>
              <div><input type ="text2"></input></div>
              <div>נושא</div>
            </div>
            <div className="row" style={{width: '100%'}}>
              <div><textarea type ="text2" style={{width: '130px'}}></textarea></div>
              <div>גוף ההודעה</div>
            </div>
            <div style={{ marginBottom: "20px" }}></div>
            <div style={{flexDirection: "row"}}>
              <button className="button button1" onClick={closeModal1}>שלח</button>
              <button className="button button1" onClick={closeModal1}>סגור</button>
            </div>
          </div>
        </div> 
        </Modal>
      <Modal 
          isOpen={modal2IsOpen}
          onRequestClose={closeModal2}
          style={customStyles2}
          contentLabel="Example Modal"
        >
        <div className="Modal">
          <div className="Modal2"> 
            <div>,הוא כלי עזר להחלפת קורסים או קבוצות בקורסים PartnerTau</div>
            <div>.מציאת שותפים לתרגילי בית וגישה לקבוצות ווצאפ של הקורסים</div>
            <div style={{ marginBottom: "30px" }}></div>
            <div>.שימו לב: המערכת הינה כלי עזר בלבד</div>
            <div>.כל פעולה אל מול האוניברסיטה מתבצעת בכלים שהיא מספקת ואין לה קשר לאתר זה</div>
            <div style={{ marginBottom: "10px" }}></div>
            <button className="button button1" onClick={closeModal2}>סגור</button>
          </div>
        </div> 
        </Modal>
    </div>
  );
}

export default NavBar;
