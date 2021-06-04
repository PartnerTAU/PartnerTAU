import axios from "axios";

//axios.defaults.headers.common["Authorization"] = "Bearer " + (localStorage.getItem("token") ? localStorage.getItem("token") : "");

export const CreatePartnerRequest = async (grpcount, reqgrpcount, grpnum, coursenumber, coursename, semester) => {
  let data = {
    grpcount: Number(grpcount),
    reqgrpcount: Number(reqgrpcount),
    grpnum: grpnum,
    coursenumber: coursenumber,
    coursename:coursename,
    semester: semester,
  };
  if (localStorage.getItem("token")) {
    //axios.defaults.headers.common["Authorization"] = "Bearer " + (localStorage.getItem("token") ? localStorage.getItem("token") : "");
    return axios
      .post("http://localhost:3001/PartnerRequest", data)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  } else {
    return { errormsg: "not connected" };
  }
};

export const CreateCourseRequest = async (reqcourseid, coursenumber, coursename, semester) => {
  let data = {
    reqcourseid: reqcourseid,
    coursenumber: coursenumber,
    coursename:coursename,
    semester: semester,
  };
  if (localStorage.getItem("token")) {
    //axios.defaults.headers.common["Authorization"] = "Bearer " + (localStorage.getItem("token") ? localStorage.getItem("token") : "");
    return axios
      .post("http://localhost:3001/CourseRequest", data)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  } else {
    return { errormsg: "not connected" };
  }
};

export const CreateGroupRequest = async (grp, reqgrp, coursenumber, coursename, semester) => {
  let data = {
    grp: grp,
    reqgrp: reqgrp,
    coursenumber: coursenumber,
    coursename: coursename,
    semester: semester,
  };
  if (localStorage.getItem("token")) {
    //axios.defaults.headers.common["Authorization"] = "Bearer " + (localStorage.getItem("token") ? localStorage.getItem("token") : "");
    return axios
      .post("http://localhost:3001/GroupRequest", data)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  } else {
    return { errormsg: "not connected" };
  }
};

export const GetCourseAutoComplete = async (text) => {
  if (localStorage.getItem("token")) {
    //axios.defaults.headers.common["Authorization"] = "Bearer " + (localStorage.getItem("token") ? localStorage.getItem("token") : "");
    return axios
      .get("http://localhost:3001/GetCourseAutoComplete", {
        params: {
          text: text,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  } else {
    return { errormsg: "not connected" };
  }
};

export const GetCourseRequests = async () => {
  if (localStorage.getItem("token")) {
    return axios
      .get("http://localhost:3001/getAllRequests")
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  } else {
    return { errormsg: "not connected" };
  }
};