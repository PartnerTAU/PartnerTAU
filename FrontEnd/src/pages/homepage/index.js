import {React,useEffect, useState} from 'react';
import '../../App.css';
import {Route, Redirect, useHistory} from 'react-router-dom';
import { loginConfirmed } from "../../utils/subjects/loginSubject/loginSubject";
import { GetCourseAutoComplete } from "../../functions/serverfunction";
import swal from 'sweetalert';


function Home() {

  const [coursename,SetNameCourse] = useState("");
  const [coursenumber,SetnumberCourse] = useState("");
  const [itemSelectedAuoComplete, SetItemSelectedAuoComplete] = useState({});
  const [semester,SetSemester] = useState("A");
  const [coursesAutoComplete, setCoursesAutoComplete] = useState([]);
  const history = useHistory();

  async function getCoursesByTerm(text, type) {
    if (type === "שם") {
      SetNameCourse(text.target.value);
      SetnumberCourse("")
    } else {
      SetnumberCourse(text.target.value);
      SetNameCourse("")
    }
    SetItemSelectedAuoComplete({})

    if (text.target.value.length > 2) {
      var ret = await GetCourseAutoComplete(text.target.value);
      setCoursesAutoComplete((prevArray) => []);
      if (ret && ret.length > 0) {
        ret.map((item, k) =>
          setCoursesAutoComplete((oldArray) => [...oldArray, item])
        );
      }
    }
  }

  const setCourseByName = (e, k) => {
    let item = coursesAutoComplete.filter(
      (a) =>
        a.course ==
        document.getElementById("CourseName" + k).getAttribute("value")
    )[0];

    SetnumberCourse(item.number);
    SetItemSelectedAuoComplete(item)
    SetNameCourse(
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
    SetNameCourse(item.course);

    SetnumberCourse(
      document.getElementById("CourseNumber" + k).getAttribute("value")
    );

    setCoursesAutoComplete((prevArray) => []);
  };


  async function Redirect(page) {
    /*localStorage.setItem("coursename", coursename);
    localStorage.setItem("coursenumber", coursenumber);
    localStorage.setItem("semester", semester);*/

    if (coursename === "" && coursenumber == "") {
      swal({
        title: "שגיאה",
        text: "הכנס מספר קורס או שם קורס",
        icon: "warning",
        dangerMode: true,
        className: "bodyAlert",
        button:{
          text: "סגור",
          className: "button1"
        }
      })
    } else {
      loginConfirmed.subjectTrigger();
      history.push("/" + page, {
        semester: semester,
        item : itemSelectedAuoComplete 
      });
      return (
        <Redirect
          to={{
            pathname: "/" + page,
          }}
        />
      );
    }
  }

  return (
    <div className="Home">

        <p style={{ fontSize: "45px", fontWeight:"bold" }}>PartnerTAU ברוכים הבאים לאתר</p>
        <div className="col">
          <div className="line">
            <div className="col">
              <div>
                <input className="inputclass" onChange={(e) => {getCoursesByTerm(e, "שם");}} value={coursename} type="text"></input>
                שם קורס
              </div>
              <div>
                {coursesAutoComplete.length > 0 && (
                  <div>
                    <ul class="autoCompleteUl">
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
            </div>

            <div style={{ marginLeft: "25px" }}>או</div>
            <div className="col">
              <div>
                <input className="inputclass" onChange={(e) => {getCoursesByTerm(e, "מספר");}} 
                  value={coursenumber}
                  type="text"
                  maxlength="9" 
                  onKeyPress={(event) => {
                    if (!/[0-9,-]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }
                }
                ></input>
                מספר קורס
              </div>
              <div>
                {coursesAutoComplete.length > 0 && (
                  <div>
                    <ul class="autoCompleteUl">
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
            </div>
          </div>
          <br></br>         
          <div>
            <select className="custom-select" name="Semester" id="semester" border="50" onChange={(semester) => {
                SetSemester(semester.target.value);
              }}
            >
              <option value="A">סמסטר א</option>
              <option value="B">סמסטר ב</option>
            </select>
            <label for="Semester" style={{ marginLeft: "20px" }}>
              סמסטר
            </label>
          </div>
        </div>
        <br></br>
        <button onClick={() => {Redirect("Courses");}} className="button button1" style={{fontSize: "30px"}}>
          חפש
        </button>
    </div>
  );
}

export default Home;