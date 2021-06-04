import {React,useEffect, useState} from 'react';
import '../../App.css';
import {Route, Redirect, useHistory} from 'react-router-dom'
import {GetCourseRequests} from '../../functions/serverfunction'
import { getOpenRequests } from '../../functions/courseRequest';

function List() {

  const [requests,setRequest] = useState([]);
  useEffect( async () => {
    setRequest((prevArray) => []);
    let x = await GetCourseRequests();
    x.map((item, k) => setRequest((oldArray) => [...oldArray, item]));

    //x.map( a =>  setRequest((oldArray) => [...oldArray, a]));

  }, []);


  const history = useHistory();
  function Redirect(page){

    history.push("/"+page);
    return <Redirect    to={{
      pathname:'/'+page
        }}/>
  }

  return (
    <div className="Home">
      <div style={{marginLeft: '1000px',marginBottom: '30px'}}>:הבקשות שלי</div>
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
                 <td><button className="buttonclose button1">הסר</button></td>
                 <td>צ'אט</td>
                 <td>{item.status}</td>
                 <td>{item.requestType}</td>
                 <td>{item.semester}</td>
                 <td>{item.courseName}</td>
                 <td>{item.courseNum}</td>
               </tr>
                ))}
    </tbody>
  </table>
    </div>
  );
}

export default List;