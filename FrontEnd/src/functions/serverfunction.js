import axios from "axios"

axios.defaults.headers.common['Authorization'] = "Bearer " + (localStorage.getItem('token') ?localStorage.getItem('token') : "" );
 

export const CreatePartnerRequest = async (grpcount, reqgrpcount, semester, course) => {
  let data = {
    grpcount:Number(grpcount), reqgrpcount:Number(reqgrpcount), course: course, semester: semester
  }
  if (localStorage.getItem("token")){
    return axios.post("http://localhost:3001/PartnerRequest", data)    
    .then(function (response) {
        return response.data
      })
    .catch(function (error) {
          return error
      })
    }
    else{
      return {errormsg: "not connected"}
    }
} 

export const CreateCourseRequest = async (reqcourseid, course, semester) => {
  let data = {
    reqcourseid:Number(reqcourseid), course: course, semester: semester
  }
  if (localStorage.getItem("token")){
    return axios.post("http://localhost:3001/CourseRequest", data)    
    .then(function (response) {
        return response.data
      })
    .catch(function (error) {
          return error
      })
  }
  else{
    return {errormsg: "not connected"}
  }
} 

export const CreateGroupRequest = async (grp, reqgrp, course, semester) => {
  let data = {
    grp:grp, reqgrp:reqgrp, course: course, semester: semester
  }
  if (localStorage.getItem("token")){
    return axios.post("http://localhost:3001/GroupRequest", data)    
    .then(function (response) {
        return response.data
      })
    .catch(function (error) {
          return error
      })
  }
  else{
    return {errormsg: "not connected"}
  }
}