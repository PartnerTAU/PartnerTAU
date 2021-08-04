import {React,useEffect, useState} from 'react';
import '../../App.css';
import {Route, Redirect, useHistory} from 'react-router-dom';
import { loginConfirmed } from "../../utils/subjects/loginSubject/loginSubject";
import { GetCourseAutoComplete } from "../../functions/serverfunction";
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';



function Home() {

  const useStyles = makeStyles((theme) => ({
    listboxNumber: {
      width: 260,
      margin: 0,
      padding: 0,
      // zIndex: 1,
      fontSize: '20px',
      position: 'absolute',
      listStyle: 'none',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      maxHeight: 70,
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
      [theme.breakpoints.down(1300)]:{
        width: 245,
      },
      [theme.breakpoints.down(1160)]:{
        fontSize: '18px',
      },
      [theme.breakpoints.down(740)]:{
        fontSize: '15px',
        width: 160,
      },
      [theme.breakpoints.down(560)]:{
        fontSize: '13px',
        width: 120,
      },
      [theme.breakpoints.down(415)]:{
        fontSize: '12px',
        width: 110,
      },
      [theme.breakpoints.down(350)]:{
        width: 85,
      },
    },
    listboxName: {
      width: 400,
      margin: 0,
      padding: 0,
      // zIndex: 1,
      fontSize: '20px',
      position: 'absolute',
      listStyle: 'none',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      maxHeight: 70,
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
      [theme.breakpoints.down(1160)]:{
        fontSize: '18px',
        width: 340,
      },
      [theme.breakpoints.down(740)]:{
        fontSize: '15px',
        width: 300,
      },
      [theme.breakpoints.down(560)]:{
        fontSize: '13px',
        width: 230,
      },
      [theme.breakpoints.down(415)]:{
        fontSize: '12px',
        width: 200,
      },
      [theme.breakpoints.down(350)]:{
        width: 180,
      },
    },
  }));

  const classes = useStyles();

  const [coursename,SetNameCourse] = useState("");
  const [coursenumber,SetnumberCourse] = useState("");
  const [itemSelectedAuoComplete, SetItemSelectedAuoComplete] = useState({});
  const [semester,SetSemester] = useState("A");
  const [coursesAutoComplete, setCoursesAutoComplete] = useState([]);
  const history = useHistory();

  async function getCoursesByTerm(text, type) {
    if (text.target.value.length != 0){
      if (type === "שם") {
        SetNameCourse(text.target.value);
        SetnumberCourse("")
      }
      else{
        SetnumberCourse(text.target.value);
        SetNameCourse("")
      } 
    }
    else{
      SetnumberCourse("");
      SetNameCourse("");
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

  function SemesterChange(semester){
    SetSemester(semester);
    SetnumberCourse("");
    SetNameCourse("");
  }

  async function Redirect(page) {

    if (coursename === "" || coursenumber == "") {
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
        <p className="websiteTitle" style={{marginBottom:"5px"}}>PartnerTAU ברוכים הבאים לאתר</p>
        <p className="abouttext" style={{marginBottom:"50px"}}>הסבר על אופן פעולת האתר ניתן למצוא באודות*</p>
        <div className="col">
        <div>
            <select className="custom-select" name="Semester" id="semester" border="50" onChange={(semester) => {
                SemesterChange(semester.target.value)}}
            >
              <option value="A">סמסטר א</option>
              <option value="B">סמסטר ב</option>
              <option value="C">סמסטר קיץ</option>
            </select>
            <label for="Semester" style={{ marginLeft: "20px"}}>
              אנא בחר סמסטר
            </label>
          </div>
          <br></br> 
          <div className="line">
            <div className="col">
              <div>
                <input className="inputclass" placeholder="דוגמה: סדנה גוגל" onChange={(e) => {getCoursesByTerm(e, "שם");}} value={coursename} type="text1"></input>
                שם קורס
              </div>
              <div>
                {coursesAutoComplete.length > 0 && (
                  <div className="AutolistStyle">
                    <ul className={classes.listboxName}>
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
            <div style={{ marginLeft: "25px" ,marginRight: "25px"}}>או</div>
            <div className="col">
              <div>
                <input className="inputclass" placeholder="דוגמה: 0368-3502" onChange={(e) => {getCoursesByTerm(e, "מספר");}} 
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

              <div >
                {coursesAutoComplete.length > 0 && (
                  <div className="AutolistStyle">
                    <ul className={classes.listboxNumber}>
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
        </div>
        <br></br>
        <button onClick={() => {Redirect("Courses");}} className="button button1" 
        >
          חפש
        </button>
    </div>
  );
}

export default Home;