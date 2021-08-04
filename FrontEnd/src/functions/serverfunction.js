import axios from "axios";

let path = 'https://partnertaubackend.herokuapp.com/'
// let path = 'http://localhost:3001/'
        

export const CreateGroupRequest = async (
  grp,
  reqgrp,
  coursenumber,
  coursename,
  semester
) => {
  let data = {
    grp: grp,
    reqgrp: reqgrp,
    coursenumber: coursenumber,
    coursename: coursename,
    semester: semester,
  };
  if (localStorage.getItem("token")) {
    if(grp=="" || reqgrp==""){
      return 0;
    }
    return axios
      .post(path+"GroupRequest", data)
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

export const GetCourseAutoComplete = async (text,semester) => {
    return axios
      .get(path+"GetCourseAutoComplete", {
        params: {
          text: text,
          semester: semester, 
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
};

export const GetAllRequests = async () => {
  if (localStorage.getItem("token")) {
    return axios
      .get(path+"getAllRequests")
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

export const GetCourseGroupByNameAndSemester = async (req) => {
    return axios
      .post(path+"GetCourseGroupByNameAndSemester", req)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
};

export const GetMatchChatGroup = async (matchId) => {
  if (localStorage.getItem("token")) {
    return axios
      .get(path+"GetMatchChatGroup", {
        params: {
          id: matchId,
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

export const InsertChatOnMatchGroup = async (req) => {
  if (localStorage.getItem("token")) {
    return axios
      .post(path+"InsertChatOnMatchGroup", req)
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

export const RemoveGroupRequest = async (req) => {
  if (localStorage.getItem("token")) {
    return axios
      .post(path+"RemoveGroupRequest", req)
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

export const CheckForNewMatchGroup = async (req) => {
  if (localStorage.getItem("token")) {
    return axios
      .post(path+"CheckForNewMatchGroup", req)
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


export const CreatePartnerRequest = async (
  grpcount,
  reqgrpcount,
  grpnum,
  coursenumber,
  coursename,
  semester
) => {
  let data = {
    grpcount: Number(grpcount),
    reqgrpcount: Number(reqgrpcount),
    grpnum: grpnum == "" ? "00" : grpnum,
    coursenumber: coursenumber,
    coursename: coursename,
    semester: semester,
  };
  if (localStorage.getItem("token")) {
    if(grpcount=="" || reqgrpcount==""){
      return 0;
    }
    return axios
      .post(path+"PartnerRequest", data)
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

export const RemovePartnerRequest = async (req) => {
  if (localStorage.getItem("token")) {
    return axios
      .post(path+"RemovePartnerRequest", req)
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

export const CheckForNewMatchPartner = async (req) => {
  if (localStorage.getItem("token")) {
    return axios
      .post(path+"CheckForNewMatchPartner", req)
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

export const GetMatchChatPartner = async (matchId) => {
  if (localStorage.getItem("token")) {
    return axios
      .get(path+"GetMatchChatPartner", {
        params: {
          id: matchId,
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

export const InsertChatOnMatchPartner = async (req) => {
  if (localStorage.getItem("token")) {
    return axios
      .post(path+"InsertChatOnMatchPartner", req)
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


export const CreateCourseRequest = async (
  coursenumber,
  coursename,
  semester,
  coursenameautocomplete,
  coursenumberautocomplete
) => {
  let data = {
    offeredcoursenumber: coursenumber,
    offeredcoursename: coursename,
    semester: semester,
    reqcoursenumber : coursenumberautocomplete,
    reqcoursename : coursenameautocomplete
  };
  if (localStorage.getItem("token")) {
    if(coursenameautocomplete=="" && coursenumberautocomplete==""){
      return 0;
    }
    return axios
      .post(path+"CourseRequest", data)
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


export const RemoveCourseRequest = async (req) => {
  if (localStorage.getItem("token")) {
    return axios
      .post(path+"RemoveCourseRequest", req)
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

export const GetMatchChatCourse = async (matchId) => {
  if (localStorage.getItem("token")) {
    return axios
      .get(path+"GetMatchChatCourse", {
        params: {
          id: matchId,
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

export const InsertChatOnMatchCourse = async (req) => {
  if (localStorage.getItem("token")) {
    return axios
      .post(path+"InsertChatOnMatchCourse", req)
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

export const CheckForNewMatchCourse = async (req) => {
  if (localStorage.getItem("token")) {
    return axios
      .post(path+"CheckForNewMatchCourse", req)
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

export const GetWhatsapp = async (coursenumber, semester) => {
    return axios
      .get(path+"GetWhatsappLinkByCourseAndSemester",{
        params: {
          coursenumber: coursenumber,
          semester: semester
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
};

export const UpdateWhatsapp = async (body) => {
  if (localStorage.getItem("token")) {
    return axios
      .post(path+"UpdateWhatsappLinkByCourseAndSemester", body)
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

export const InsertWhatsapp = async (body) => {
  if (localStorage.getItem("token")) {
    return axios
      .post(path+"SetWhatsappLinkByCourseAndSemester", body)
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