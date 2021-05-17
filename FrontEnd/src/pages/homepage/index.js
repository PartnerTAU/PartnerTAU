import {React,useEffect, useState} from 'react';
import '../../App.css';
import {Route, Redirect, useHistory} from 'react-router-dom';
import { loginConfirmed } from "../../utils/subjects/loginSubject/loginSubject";


function Home() {

  const [coursename,SetNameCourse] = useState("");
  const [coursenumber,SetnumberCourse] = useState("");
  const [semester,SetSemester] = useState("");
  const history = useHistory();

  function Redirect(page){	
    localStorage.setItem("coursename", coursename);
    localStorage.setItem("coursenumber", coursenumber);
    localStorage.setItem("semester", semester);

    loginConfirmed.subjectTrigger();
    history.push("/"+page);
    return <Redirect    to={{
      pathname:'/'+page
        }}/>
  }

  return (
    <div className="Home">
      <div className="login" >
        <p staly={{marginBottom: '30px'}}>PartnerTAU ברוכים הבאים לאתר</p>
        <div className="col" >
          <div className="row" >
              <div><input className="inputclass" onChange={(namecours) =>{SetNameCourse(namecours.target.value)}} type ="text"></input>שם קורס</div>
              <div style={{marginLeft: '25px'}}>או</div>
              <div><input 
              className="inputclass"
              onChange={(numbercours) =>{SetnumberCourse(numbercours.target.value)}} 
              type = "text"
              maxlength="8" 
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}></input >מספר קורס</div>
            </div>

            <div><select name="Semester" id="semester" border="50">
            <option value="Semester A">סמסטר א</option>
            <option value="Semester B">סמסטר ב</option>
            </select>
            <label for="Semester" style={{marginLeft: '20px'}}>סמסטר</label></div>
        </div>
      </div>
      <button onClick={()=>{Redirect('Courses')}} className="button button1">חפש</button>
    </div>
  );
}

export default Home;