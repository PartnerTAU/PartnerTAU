import {React,useEffect, useState} from 'react';
import '../../App.css';
import {Route, Redirect, useHistory} from 'react-router-dom'

function List() {

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
      <tr>
        <td><button className="buttonclose button1">הסר</button></td>
        <td>צ'אט</td>
        <td>הושלם</td>
        <td>החלפת קבוצה</td>
        <td>א</td>
        <td>מעבדת אלקטרוניקה</td>
        <td>3759-7849</td>
      </tr>
      <tr></tr>
      <tr>
        <td><button className="buttonclose button1">הסר</button></td>
        <td>צ'אט</td>
        <td>טרם נמצאה התאמה</td>
        <td>מציאת שותפים</td>
        <td>א</td>
        <td>מבני נתונים</td>
        <td>3759-5890</td>
      </tr>
      <tr></tr>
      

    </tbody>
  </table>
    </div>
  );
}

export default List;