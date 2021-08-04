const mysqlConnection = require('../db/db.config')
const email = require("../email/emailRepo");
const match = require("../repositories/matchRepository");

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


const CreatePartnerRequest = async (request, tokenDecoded) =>{
    try{
        var exec  = await mysqlConnection("insert into partnertau.partner_request (user,courseid,coursename,semester,grp,neededgroupsize,mygroupsize,done,status) values (?,?,?,?,?,?,?,?,?)"
        , [tokenDecoded.data, request.body.coursenumber, request.body.coursename, request.body.semester, request.body.grpnum, request.body.reqgrpcount - request.body.grpcount, request.body.grpcount, false,'בחיפוש התאמה']);
        let courses =  [];
        if(exec.affectedRows > 0)
        {
            CheckForPartnerMatch(exec.insertId,tokenDecoded)

        }
       
        return true
    }
    catch(e){
        return false;
    }
}

const CreateCourseRequest = async (request, tokenDecoded) =>{
    try{
        var exec  = await mysqlConnection("insert into partnertau.course_request (user,offeredcoursename,offeredcoursenumber,semester,reqcoursenumber,reqcoursename,status,done) values (?,?,?,?,?,?,?,?)"
        , [tokenDecoded.data, request.body.offeredcoursename, request.body.offeredcoursenumber, request.body.semester, request.body.reqcoursenumber,request.body.reqcoursename,'בחיפוש התאמה', false]);
        let courses =  [];
        if(exec.affectedRows > 0)
        {
            CheckForCourseMatch(exec.insertId,tokenDecoded)
        }
       
        return true
    }
    catch(e){
        return false;
    }
}

const CreateGroupRequest = async (request, tokenDecoded) =>{
    try{
        var exec  = await mysqlConnection("insert into partnertau.group_request (user,courseid,coursename,semester,grp,req_grp,done,status) values (?,?,?,?,?,?,?,?)"
        , [tokenDecoded.data, request.body.coursenumber, request.body.coursename, request.body.semester, request.body.grp, request.body.reqgrp, false,'בחיפוש התאמה']);
        let courses =  [];
        if(exec.affectedRows > 0)
        {
            let id = exec.insertId
             exec  = await mysqlConnection("select * from partnertau.group_request where id != ? and req_grp = ? and grp = ? and user != ? and done = ? and coursename = ? and semester = ?"
            , [id, request.body.grp, request.body.reqgrp,tokenDecoded.data,false,request.body.coursename,request.body.semester]);
            let cont = true;
            if(exec && exec.length > 0)
            { 
                if(cont)
                {
                    try
                    {

                        let a =  exec.find(b => !b.matchId || b.matchId == 0)
                        if(a)
                        {
                            if(cont)
                            {
                                const queryExec = await match.CheckIfMatchOnAirGroup(a.id)
                                if((!queryExec || queryExec.length == 0))
                                {
                                    cont = false;
                                    let matchForId = await match.InsertMatchGroup(a.id,id,a.user,tokenDecoded.data)
                                    if(matchForId)
                                    {
                                         UpterGroupReqStatus(a.id,'נמצאה התאמה', matchForId.insertId)
                                         UpterGroupReqStatus(id,'נמצאה התאמה', matchForId.insertId)
                                        email.SendMatchEmail(a.user,tokenDecoded.data)
                                    }                                   
                                }
                            }
                        }
                    }

                    catch(e)
                    {

                    }                                    
                }
               

            }
            return true
        }
       
        return false;
    }
    catch(e){
        return false;
    }
}


const parseSemester =(semester) =>{
    if(semester == "A"){
        return "סמסטר א"
    }
    else if(semester == "B"){
        return "סמסטר ב"
    }
    else if(semester == "C"){
        return "סמסטר קיץ"
    }
}

const CheckForPartnerMatch = async (id,tokenDecoded) => {
    if(id > 0)
        { 
            try
            {

                let original =  await mysqlConnection("select * from partnertau.partner_request where id = ?", [id]);
                let exec  = await mysqlConnection("select * from partnertau.partner_request where id != ? and mygroupsize = ? and neededgroupsize = ? and user != ? and done = ? and coursename = ? and semester = ?"
                , [id, original[0].neededgroupsize, original[0].mygroupsize,tokenDecoded.data,false,original[0].coursename,original[0].semester]);
                let cont = true;
                if(exec && exec.length > 0)
                {
                    
                    if(cont)
                    {
                        try
                        {
                        let a =  exec.find(b => !b.matchId || b.matchId == 0)
                        if(a){
                            
                                if(cont)
                                {
                                    const queryExec = await match.CheckIfMatchOnAirPartner(a.id)
                                    if((!queryExec || queryExec.length == 0))
                                    {
                                        cont = false;
                                        let matchForId = await match.InsertMatchPartner(a.id,id,a.user,tokenDecoded.data)
                                        if(matchForId)
                                        {
                                            UpterPartnerReqStatus(a.id,'נמצאה התאמה', matchForId.insertId)
                                            UpterPartnerReqStatus(id,'נמצאה התאמה', matchForId.insertId)
                                            email.SendMatchEmail(a.user,tokenDecoded.data)
                                        }

                                    }
                                }                               
                            }

                        }
                        catch (e)
                            {
                                let o =e;
                            }
                    }
                }
            }
            catch(e)
            {
                let o =e;
            }



    }
}


const CheckForCourseMatch = async (id,tokenDecoded) => {
    if(id > 0)
        {
            try
            {

                let original =  await mysqlConnection("select * from partnertau.course_request where id = ?", [id]);
                let exec  = await mysqlConnection("select * from partnertau.course_request where id != ? and reqcoursename = ? and offeredcoursename = ? and user != ? and done = ? and semester = ?"
                , [id, original[0].offeredcoursename, original[0].reqcoursename,tokenDecoded.data,false,original[0].semester]);
                let cont = true;
                if(exec && exec.length > 0)
                {
                    
                    if(cont)
                    {
                        try
                        {
                        let a =  exec.find(b => !b.matchId || b.matchId == 0)
                        if(a){
                            
                                if(cont)
                                {
                                    const queryExec = await match.CheckIfMatchOnAirCourse(a.id)
                                    if((!queryExec || queryExec.length == 0))
                                    {
                                        cont = false;
                                        let matchForId = await match.InsertMatchCourse(a.id,id,a.user,tokenDecoded.data)
                                        if(matchForId)
                                        {
                                            UpterCourseReqStatus(a.id,'נמצאה התאמה', matchForId.insertId)
                                            UpterCourseReqStatus(id,'נמצאה התאמה', matchForId.insertId)
                                            email.SendMatchEmail(a.user,tokenDecoded.data)
                                        }
                                    }
                                }
                            }
                            
                            
                        }
                        catch (e)
                            {
                                let o =e;
                            }
                    }
                

                }
            }
            catch(e)
            {
                let o =e;
            }
    }
}



const UpterGroupReqStatus = async (id,status,matchId) =>{
    try{
        await  mysqlConnection("update partnertau.group_request set status = ?, matchId = ? where id = ?"
        , [status,matchId,id]);
    }
    catch(e){
        let x =e;
    }
   
}

const UpterPartnerReqStatus = async (id,status,matchId) =>{
    try{
        await  mysqlConnection("update partnertau.partner_request set status = ?, matchId = ? where id = ?"
        , [status,matchId,id]);
    }
    catch(e){
        let x =e;
    }
   
}

const UpterCourseReqStatus = async (id,status,matchId) =>{
    try{
        await  mysqlConnection("update partnertau.course_request set status = ?, matchId = ? where id = ?"
        , [status,matchId,id]);
    }
    catch(e){
        let x =e;
    }
   
}

const parseStatus =(done) =>{
    if(done == false){
        return "טרם נמצאה התאמה"
    }
    else if(semester == true){
        return "נמצאה התאמה"
    }
}

const MarkRequestAsResolved = async (request,tokenDecoded) =>{
    try{
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


const GetCourseListAutoComnpleteTypeA = async (text) =>{
    try{
        var exec  = await mysqlConnection("select * from  courses where semester = ? and name like ? group by name limit 0,5"
        ,  ["A", '%' + text + '%']);
        let answer =[];    
        if(exec.length == 0){
            var exec  = await mysqlConnection("select * from  courses where semester = ? and number like ? group by number  limit 0,5"
            ,  ["A", '%' + text + '%']);
        }
        if(exec.length > 0 ){       
                exec.forEach(a => {                
                    answer.push({
                        id : a.id,
                        course : a.name,
                        number : a.number,
                    })
                })
        }
        return answer;
    }
    catch(e){
        return null;
    }
}

const GetCourseListAutoComnpleteTypeB = async (text) =>{
    try{
        var exec  = await mysqlConnection("select * from  courses where semester = ? and name like ? group by name limit 0,5"
        ,  ["B", '%' + text + '%']);
        let answer =[];    
        if(exec.length == 0){
            var exec  = await mysqlConnection("select * from  courses where semester = ? and number like ? group by number  limit 0,5"
            ,  ["B", '%' + text + '%']);
        }
        if(exec.length > 0 ){       
                exec.forEach(a => {                
                    answer.push({
                        id : a.id,
                        course : a.name,
                        number : a.number,
                    })
                })
        }
        return answer;
    }
    catch(e){
        return null;
    }
}

const GetCourseListAutoComnpleteTypeC = async (text) =>{
    try{
        var exec  = await mysqlConnection("select * from  courses where semester = ? and name like ? group by name limit 0,5"
        ,  ["C", '%' + text + '%']);
        let answer =[];    
        if(exec.length == 0){
            var exec  = await mysqlConnection("select * from  courses where semester = ? and number like ? group by number  limit 0,5"
            ,  ["C", '%' + text + '%']);
        }
        if(exec.length > 0 ){       
                exec.forEach(a => {                
                    answer.push({
                        id : a.id,
                        course : a.name,
                        number : a.number,
                    })
                })
        }
        return answer;
    }
    catch(e){
        return null;
    }
}


const GetCourseGroupBySemeserAndGroup = async (body) =>{
    try{
        var exec  = await mysqlConnection("select * from  courses where name = ? and semester = ?"
        ,  [body.name,body.semester]);

        let answer =[];
       

        if(exec.length > 0 )
        {          
                exec.forEach(a => {                   
                    answer.push({
                        group : a.group,
                    })
                })

        }
       
        return answer;
    }
    catch(e){
        return null;
    }
   


}

const RemoveRequestGroup = async (body) =>{
    try{
        var exec  = await mysqlConnection("update partnertau.group_request set done = ? where id = ?"
        ,  [true,body.id]);

       

        if(exec.affectedRows > 0 )
        {
           
            exec  = await mysqlConnection("select * from partnertau.group_request where id = ?"
            ,  [body.id]);

            if(exec[0].matchId && exec[0].matchId > 0){
                match.UpdateMatchGroup(exec[0].matchId,exec[0].user,exec[0].coursename)
            }


        }
       
        return true;
    }
    catch(e){
        return false;
    }
   


}




const RemoveRequestPartner = async (body) =>{
    try{
        var exec  = await mysqlConnection("update partnertau.partner_request set done = ? where id = ?"
        ,  [true,body.id]);
        if(exec.affectedRows > 0 )
        {
            exec  = await mysqlConnection("select * from partnertau.partner_request where id = ?"
            ,  [body.id]);

            if(exec[0].matchId && exec[0].matchId > 0){
                match.UpdateMatchPartner(exec[0].matchId,exec[0].user,exec[0].coursename)
            }


        }
       
        return true;
    }
    catch(e){
        return false;
    }
   


}



const RemoveRequestCourse = async (body) =>{
    try{
        var exec  = await mysqlConnection("update partnertau.course_request set done = ? where id = ?"
        ,  [true,body.id]);

       

        if(exec.affectedRows > 0 )
        {
           
            exec  = await mysqlConnection("select * from partnertau.course_request where id = ?"
            ,  [body.id]);

            if(exec[0].matchId && exec[0].matchId > 0){
                match.UpdateMatchCourse(exec[0].matchId,exec[0].user,exec[0].coursename)
            }


        }
       
        return true;
    }
    catch(e){
        return false;
    }
   


}


const GetAllRequests = async (tokenDecoded) =>{
    try{
        let requests =  [];
        var exec  = await mysqlConnection("select * from partnertau.partner_request where user=? and done = ?"
        , [tokenDecoded.data,false]);
        if(exec.length > 0){
            exec.forEach(a => {
                requests.push({
                    id : a.id,
                    courseNum: a.courseid,
                    courseName: a.coursename,
                    semester: parseSemester(a.semester),
                    requestType: "מציאת שותפים",
                    type : 'partner',
                    status: a.status,
                    matchId : a.matchId,
                    NeededSize: a.neededgroupsize,
                    MySize: a.mygroupsize,
                    grp: a.grp,
                })
            })
        }
        var exec2  = await mysqlConnection("select * from partnertau.group_request where user=? and done = ?"
        , [tokenDecoded.data,false]);
        if(exec2.length > 0){
            exec2.forEach(a => {
                requests.push({
                    id: a.id,
                    courseNum: a.courseid,
                    courseName: a.coursename,
                    semester: parseSemester(a.semester),
                    requestType: "החלפת קבוצה",
                    type : 'group',
                    status: a.status,
                    matchId : a.matchId,
                    grp: a.grp,
                    reqgrp: a.req_grp,
                })
            })
        }
        var exec1  = await mysqlConnection("select * from partnertau.course_request where user=? and done = ?"
        , [tokenDecoded.data, false]);
        if(exec1.length > 0){
            exec1.forEach(a => {
                requests.push({
                    id: a.id,
                    courseNum: a.offeredcoursenumber,
                    courseName: a.offeredcoursename,
                    semester: parseSemester(a.semester),
                    requestType: "החלפת קורס",
                    type : 'course',
                    status: a.status,
                    matchId : a.matchId,
                    reqcourse: a.reqcoursenumber,
                })
            })
        }
        return requests;
    }
    catch(e){
        return [];
    }
}


module.exports ={
    GetCourseList: GetCourseList,
    CreatePartnerRequest : CreatePartnerRequest,
    CreateCourseRequest : CreateCourseRequest,
    CreateGroupRequest : CreateGroupRequest,
    GetActiveRequestedByUserId : GetActiveRequestedByUserId,
    MarkRequestAsResolved : MarkRequestAsResolved,
    GetCourseListAutoComnpleteTypeA : GetCourseListAutoComnpleteTypeA,
    GetCourseListAutoComnpleteTypeB : GetCourseListAutoComnpleteTypeB,
    GetCourseListAutoComnpleteTypeC : GetCourseListAutoComnpleteTypeC,
    GetAllRequests: GetAllRequests,
    GetCourseGroupBySemeserAndGroup : GetCourseGroupBySemeserAndGroup,
    RemoveRequestGroup: RemoveRequestGroup,
    UpterGroupReqStatus: UpterGroupReqStatus,
    UpterPartnerReqStatus : UpterPartnerReqStatus,
    CheckForPartnerMatch : CheckForPartnerMatch,
    RemoveRequestPartner : RemoveRequestPartner,
    CheckForCourseMatch : CheckForCourseMatch,
    RemoveRequestCourse : RemoveRequestCourse
}