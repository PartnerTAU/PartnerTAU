const mysqlConnection = require('../db/db.config')
const email = require('../email/emailRepo')
const courseRepository = require("../repositories/coursRepository");

const CheckIfMatchOnAirGroup = async (courseid) =>{
    try{
        const queryExec  = await mysqlConnection("select * from partnertau.group_request_match where requestOneId = ? or  requesTwoId = ?"
            , [courseid,courseid]);

            return queryExec;
        
    }
    catch(e){
        return null;
    }
}


const CheckIfMatchOnAirPartner = async (courseid) =>{
    try{
        const queryExec  = await mysqlConnection("select * from partnertau.partner_request_match where requestOneId = ? or  requesTwoId = ?"
            , [courseid,courseid]);

            return queryExec;
        
    }
    catch(e){
        return null;
    }
}


const CheckIfMatchOnAirCourse = async (courseid) =>{
    try{
        const queryExec  = await mysqlConnection("select * from partnertau.course_request_match where requestOneId = ? or  requesTwoId = ?"
            , [courseid,courseid]);

            return queryExec;
        
    }
    catch(e){
        return null;
    }
}

const GetMatchOnAirGroup = async (matchId) =>{
    try{
        const queryExec  = await mysqlConnection("select * from partnertau.group_request_match where id = ?"
            , [matchId]);

            return queryExec;
        
    }
    catch(e){
        return null;
    }
}


const InsertMatchGroup = async (courseIdOne,CourseIdTwo,uidOne,uidTwo) =>{
    try{
        let exec = await mysqlConnection("insert into partnertau.group_request_match (requestOneId,requesTwoId,requsetOneDone,requsetTwoDone,requsetOneUserId,requsetTwoUserId) values (?,?,?,?,?,?)"
        , [courseIdOne,CourseIdTwo,false,false,uidOne,uidTwo]);

        return exec;
    }
    catch(e){
        return null;
    }
}


const GetMatchOnAirPartner = async (matchId) =>{
    try{
        const queryExec  = await mysqlConnection("select * from partnertau.partner_request_match where id = ?"
            , [matchId]);

            return queryExec;
        
    }
    catch(e){
        return null;
    }
}

const GetMatchOnAirCourse = async (matchId) =>{
    try{
        const queryExec  = await mysqlConnection("select * from partnertau.course_request_match where id = ?"
            , [matchId]);

            return queryExec;
        
    }
    catch(e){
        return null;
    }
}



const InsertMatchPartner = async (courseIdOne,CourseIdTwo,uidOne,uidTwo) =>{
    try{
        let exec = await mysqlConnection("insert into partnertau.partner_request_match (requestOneId,requesTwoId,requsetOneDone,requsetTwoDone,requsetOneUserId,requsetTwoUserId) values (?,?,?,?,?,?)"
        , [courseIdOne,CourseIdTwo,false,false,uidOne,uidTwo]);

        return exec;
    }
    catch(e){
        return null;
    }
}

const InsertMatchCourse = async (courseIdOne,CourseIdTwo,uidOne,uidTwo) =>{
    try{
        let exec = await mysqlConnection("insert into partnertau.course_request_match (requestOneId,requesTwoId,requsetOneDone,requsetTwoDone,requsetOneUserId,requsetTwoUserId) values (?,?,?,?,?,?)"
        , [courseIdOne,CourseIdTwo,false,false,uidOne,uidTwo]);

        return exec;
    }
    catch(e){
        return null;
    }
}

const UpdateMatchGroup = async (matchId,userid,coursename) =>{
    try{
       
        let matchQuery = await GetMatchOnAirGroup(matchId);
        let exec = await mysqlConnection("update partnertau.group_request set status = ? where id = ? or id = ?"
        , ['ממתין לפעולתך',matchQuery[0].requestOneId,matchQuery[0].requesTwoId]);

        if(matchQuery[0].requsetOneUserId == userid)
        {
            matchQuery[0].requsetOneDone = true;
            if(matchQuery[0].requsetTwoDone != true){
                //emailSendRemoveRequestEmail
                email.SendRemoveRequestEmail(matchQuery[0].requsetTwoUserId,'קבוצה',coursename )
            }
        }
        else
        {
            matchQuery[0].requsetTwoDone = true;
            if(matchQuery[0].requsetOneDone != true){
                //email
                email.SendRemoveRequestEmail(matchQuery[0].requsetOneUserId,'קבוצה',coursename )
            }
        }

         exec = await mysqlConnection("update partnertau.group_request_match set requsetOneDone = ?, requsetTwoDone = ? where id = ? "
        , [matchQuery[0].requsetOneDone,matchQuery[0].requsetTwoDone,matchId]);

    }
    catch(e){

    }
}

const CheckForNewMatchGroup = async (req,tokenDecoded) =>{
    try{
       
        let answer = false;

        await mysqlConnection("update partnertau.group_request set status = ?, matchId = ? where id = ?"
       , ['בחיפוש התאמה',0,req.id]);

       await mysqlConnection("update partnertau.group_request_match set requestOneId = ?, requesTwoId = ? where requesTwoId =  ? or requestOneId = ?"
        ,[-1,-1,req.id,req.id]);




       let exec = await mysqlConnection("select * from partnertau.group_request where id = ?"
       , [req.id]);



          if(exec && exec.length > 0){
            let body = exec[0];
            let exec1  = await mysqlConnection("select * from partnertau.group_request where id != ? and req_grp = ? and grp = ? and user != ? and done = ? and coursename = ? and semester = ?"
            , [req.id, body.grp, body.req_grp,tokenDecoded.data,false,exec[0].coursename,exec[0].semester ]);
        let cont = true;
        if(exec1 && exec1.length > 0)
        {
            
            if(cont)
            {
                
                try
                {

                    let a =  exec1.find(b => !b.matchId || b.matchId == 0 || b.status == 'ממתין לפעולתך')
                    if(a)
                    {
                        if(cont)
                        {
                            const queryExec = await CheckIfMatchOnAirGroup(a.id)
                            if((!queryExec || queryExec.length == 0) || a.status == 'ממתין לפעולתך')
                            {
                                cont = false;
                                let matchForId = await InsertMatchGroup(a.id,req.id,a.user,tokenDecoded.data)
                                if(matchForId)
                                {
                                     await UpterGroupReqStatus(a.id,'נמצאה התאמה', matchForId.insertId)
                                     await UpterGroupReqStatus(req.id,'נמצאה התאמה', matchForId.insertId)
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

       }
       return answer;
        
    }
    catch(e){
        return false;
    }
}




const CheckForNewMatchPartner = async (req,tokenDecoded) =>{
    try{
       
        let answer = false;

       


       await mysqlConnection("update partnertau.partner_request set status = ?, matchId = ? where id = ?"
       , ['בחיפוש התאמה',0,req.id]);

       await mysqlConnection("update partnertau.partner_request_match set requestOneId = ?, requesTwoId = ? where requesTwoId = ? or requestOneId = ?"
        ,[-1,-1,req.id,req.id]);


        await require("../repositories/coursRepository").CheckForPartnerMatch(req.id,tokenDecoded)
       

       answer = true;

       return answer;
        
    }
    catch(e){
        return false;
    }
}

const CheckForNewMatchCourse = async (req,tokenDecoded) =>{
    try{
       
        let answer = false;


       await mysqlConnection("update partnertau.course_request set status = ?, matchId = ? where id = ?"
       , ['בחיפוש התאמה',0,req.id]);

       await mysqlConnection("update partnertau.course_request_match set requestOneId = ?, requesTwoId = ? where requesTwoId = ? or requestOneId = ?"
        ,[-1,-1,req.id,req.id]);


       


        await require("../repositories/coursRepository").CheckForCourseMatch(req.id,tokenDecoded)
       

       answer = true;

       return answer;
        
    }
    catch(e){
        return false;
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


const UpdateMatchPartner = async (matchId,userid,coursename) =>{
    try{
       
        let matchQuery = await GetMatchOnAirPartner(matchId);
        let exec = await mysqlConnection("update partnertau.partner_request set status = ? where id = ? or id = ?"
        , ['ממתין לפעולתך',matchQuery[0].requestOneId,matchQuery[0].requesTwoId]);

        if(matchQuery[0].requsetOneUserId == userid)
        {
            matchQuery[0].requsetOneDone = true;
            if(matchQuery[0].requsetTwoDone != true){
                //emailSendRemoveRequestEmail
                email.SendRemoveRequestEmail(matchQuery[0].requsetTwoUserId,'מציאת שותפים',coursename )
            }
        }
        else
        {
            matchQuery[0].requsetTwoDone = true;
            if(matchQuery[0].requsetOneDone != true){
                //email
                email.SendRemoveRequestEmail(matchQuery[0].requsetOneUserId,'מציאת שותפים',coursename )
            }
        }

         exec = await mysqlConnection("update partnertau.partner_request_match set requsetOneDone = ?, requsetTwoDone = ? where id = ? "
        , [matchQuery[0].requsetOneDone,matchQuery[0].requsetTwoDone,matchId]);

    }
    catch(e){
        let x= e;
    }
}

const UpdateMatchCourse = async (matchId,userid,coursename) =>{
    try{
       
        let matchQuery = await GetMatchOnAirCourse(matchId);
        let exec = await mysqlConnection("update partnertau.course_request set status = ? where id = ? or id = ?"
        , ['ממתין לפעולתך',matchQuery[0].requestOneId,matchQuery[0].requesTwoId]);

        if(matchQuery[0].requsetOneUserId == userid)
        {
            matchQuery[0].requsetOneDone = true;
            if(matchQuery[0].requsetTwoDone != true){
                //emailSendRemoveRequestEmail
                email.SendRemoveRequestEmail(matchQuery[0].requsetTwoUserId,'החלפת קורס',coursename )
            }
        }
        else
        {
            matchQuery[0].requsetTwoDone = true;
            if(matchQuery[0].requsetOneDone != true){
                //email
                email.SendRemoveRequestEmail(matchQuery[0].requsetOneUserId,'החלפת קורסים',coursename )
            }
        }

         exec = await mysqlConnection("update partnertau.course_request_match set requsetOneDone = ?, requsetTwoDone = ? where id = ? "
        , [matchQuery[0].requsetOneDone,matchQuery[0].requsetTwoDone,matchId]);

    }
    catch(e){
        let x= e;
    }
}



module.exports ={
    CheckIfMatchOnAirGroup: CheckIfMatchOnAirGroup,
    InsertMatchGroup : InsertMatchGroup,
    GetMatchOnAirGroup: GetMatchOnAirGroup,
    UpdateMatchGroup:UpdateMatchGroup,
    CheckForNewMatchGroup : CheckForNewMatchGroup,
    CheckIfMatchOnAirPartner : CheckIfMatchOnAirPartner,
    InsertMatchPartner : InsertMatchPartner,
    GetMatchOnAirPartner : GetMatchOnAirPartner,
    UpdateMatchPartner : UpdateMatchPartner,
    CheckForNewMatchPartner : CheckForNewMatchPartner,
    CheckIfMatchOnAirCourse : CheckIfMatchOnAirCourse,
    InsertMatchCourse : InsertMatchCourse,
    UpdateMatchCourse : UpdateMatchCourse,
    GetMatchOnAirCourse : GetMatchOnAirCourse,
    CheckForNewMatchCourse : CheckForNewMatchCourse
}