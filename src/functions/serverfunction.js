import axios from "axios"

axios.defaults.headers.common['Authorization'] = "Bearer " + (localStorage.getItem('token') ?localStorage.getItem('token') : "" );
 

export const CreatePartnerRequest = async (grpcount, reqgrpcount) => {
  let data = {
    grpcount:Number(grpcount), reqgrpcount:Number(reqgrpcount)
  }
  return axios.post("http://localhost:3001/PartnerRequest", data)    
  .then(function (response) {
      return response.data
    })
  .catch(function (error) {
        return error
    })
} 

export const CreateCourseRequest = async (reqcourseid) => {
  let data = {
    reqcourseid:Number(reqcourseid)
  }
  return axios.post("http://localhost:3001/CourseRequest", data)    
  .then(function (response) {
      return response.data
    })
  .catch(function (error) {
        return error
    })
} 

export const CreateGroupRequest = async (grp, reqgrp) => {
  let data = {
    grp:grp, reqgrp:reqgrp
  }
  return axios.post("http://localhost:3001/GroupRequest", data)    
  .then(function (response) {
      return response.data
    })
  .catch(function (error) {
        return error
    })
}