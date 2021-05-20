const mysqlConnection = require('../db/db.config')

const GetCourseList = async (userId) =>{
    try{
        var rows  = await mysqlConnection("select * from  Course where");
        let courses =  [];
        if(rows.length > 0)
        {
            rows.forEach((row) => courses.push(row));
        }
       
        return courses;
    }
    catch(e){
        return null;
    }
   


}

const CreatePartnerRequest = async (request,tokenDecoded) =>{
    try{
        //An example how to call sql query
        //you must create async finction and use await, otherwise,  you'll get null as an answer
        /*var exec  = await mysqlConnection("insert into partner_request (user,courseid,semester,group,count,done) values (?,?,?,?,?,?)"
        , [tokenDecoded.data, request.courseId, ,request.requestedCourseId,false]);*/
        var exec  = await mysqlConnection("insert into partnertau.partner_request (user,courseid,semester,grp,count,done) values (?,?,?,?,?,?)"
        , [tokenDecoded, request.body.course, request.body.semester, "01", request.body.reqgrpcount - request.body.grpcount, false]);
        let courses =  [];
        if(exec.affectedRows > 0)
        {
            return true
        }
       
        return false;
    }
    catch(e){
        return false;
    }
}

const CreateCourseRequest = async (request,tokenDecoded) =>{
    try{
        //An example how to call sql query
        //you must create async finction and use await, otherwise,  you'll get null as an answer
        /*var exec  = await mysqlConnection("insert into partner_request (user,courseid,semester,group,count,done) values (?,?,?,?,?,?)"
        , [tokenDecoded.data, request.courseId, ,request.requestedCourseId,false]);*/
        var exec  = await mysqlConnection("insert into partnertau.course_request (user,courseid,semester,req_courseid,done) values (?,?,?,?,?)"
        , [tokenDecoded, request.body.course, request.body.semester, request.body.reqcourseid, false]);
        let courses =  [];
        if(exec.affectedRows > 0)
        {
            return true
        }
       
        return false;
    }
    catch(e){
        return false;
    }
}

const CreateGroupRequest = async (request,tokenDecoded) =>{
    try{
        //An example how to call sql query
        //you must create async finction and use await, otherwise,  you'll get null as an answer
        /*var exec  = await mysqlConnection("insert into partner_request (user,courseid,semester,group,count,done) values (?,?,?,?,?,?)"
        , [tokenDecoded.data, request.courseId, ,request.requestedCourseId,false]);*/
        var exec  = await mysqlConnection("insert into partnertau.group_request (user,courseid,semester,grp,req_grp,done) values (?,?,?,?,?,?)"
        , [tokenDecoded, request.body.course, request.body.semester, request.body.grp, request.body.reqgrp, false]);
        let courses =  [];
        if(exec.affectedRows > 0)
        {
            return true
        }
       
        return false;
    }
    catch(e){
        return false;
    }
}


const MarkRequestAsResolved = async (request,tokenDecoded) =>{
    try{
        //An example how to call sql query
        //you must create async finction and use await, otherwise,  you'll get null as an answer
        var exec  = await mysqlConnection("update courserequest set resolved = ? where id = ? and userId = ?"
        , [true, request,tokenDecoded.data]);
        let courses =  [];
        if(exec.affectedRows > 0)
        {
            let resp = {
                isSuccess : true
            };
            return resp
        }
       
        return   resp = {
            isSuccess : false
        };
    }
    catch(e){
        return false;
    }
   


}


const GetActiveRequestedByUserId = async (id) =>{
    try{
        //An example how to call sql query
        //you must create async finction and use await, otherwise,  you'll get null as an answer
        var exec  = await mysqlConnection("select * from  courserequest where userId = ? and resolved = ?"
        , [id,false]);

        let answer =[];
       
        if(exec.length > 0 )
        {
            let courses= await mysqlConnection("select * from  course");
            if(courses.length > 0){
                exec.forEach(a => {

                    let  nameRequest = courses.filter(b =>  b.id == a.requestedCourseId);
                    let  nameOffer = courses.filter(b => b.id == a.offeredCourseId);

                    answer.push({
                        id : a.id,
                        requested : nameRequest && nameRequest.length > 0 ? nameRequest[0].courseName : a.requestedCourseId,
                        nameOffer : nameOffer && nameOffer.length > 0 ? nameOffer[0].courseName : a.offeredCourseId,
                    })



                })
            }



        }
       
        return answer;
    }
    catch(e){
        return null;
    }
   


}





module.exports ={
    GetCourseList: GetCourseList,
    CreatePartnerRequest : CreatePartnerRequest,
    CreateCourseRequest : CreateCourseRequest,
    CreateGroupRequest : CreateGroupRequest,
    GetActiveRequestedByUserId : GetActiveRequestedByUserId,
    MarkRequestAsResolved : MarkRequestAsResolved
}