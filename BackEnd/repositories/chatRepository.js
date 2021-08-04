const mysqlConnection = require('../db/db.config')
const matchRepository = require('../repositories/matchRepository')
const email = require('../email/emailRepo')

const GetMatchChatGroup = async (id,decodedToken) =>{
    try{
        var exec  = await mysqlConnection("select * from partnertau.group_request_match_chat where matchId = ?"
        , [Number(id)]);
        let chat = [];

        if(exec && exec.length > 0){
            exec.forEach(a =>{
                chat.push({
                    isMe : a.creator == decodedToken.data? true : false,
                    message : a.message,
                    creationDate : a.creationDate
                })
            })
        }
        return chat;
      
    }
    catch(e){
        return [];
    }
   


}

const InsertMatchChatGroup = async (body,decodedToken) =>{
    try{
        var exec  = await mysqlConnection("insert into partnertau.group_request_match_chat (matchId,creator,message,creationDate) values (?,?,?,?)"
        , [body.matchId, decodedToken.data,body.message, new Date()]);
        if(exec && exec.insertId > 0)
        {
            let matchQuery = await matchRepository.GetMatchOnAirGroup(body.matchId)
            if(matchQuery && matchQuery.length > 0)
            {    
                if(matchQuery[0].requsetOneUserId == decodedToken.data)
                {
                    email.SendChatEmail(matchQuery[0].requsetTwoUserId,'group',body.coursename)
                }
                else
                {
                    email.SendChatEmail(matchQuery[0].requsetOneUserId,'group',body.coursename)
                }
            }
            return true;
        }
        return false;
      
    }
    catch(e){
        return false;
    }
   


}


const InsertMatchChatPartner = async (body,decodedToken) =>{
    try{
        var exec  = await mysqlConnection("insert into partnertau.partner_request_match_chat (matchId,creator,message,creationDate) values (?,?,?,?)"
        , [body.matchId, decodedToken.data,body.message, new Date()]);
        if(exec && exec.insertId > 0)
        {
            let matchQuery = await matchRepository.GetMatchOnAirPartner(body.matchId)
            if(matchQuery && matchQuery.length > 0)
            {      
                if(matchQuery[0].requsetOneUserId == decodedToken.data)
                {
                    email.SendChatEmail(matchQuery[0].requsetTwoUserId,'partner',body.coursename)
                }
                else
                {
                    email.SendChatEmail(matchQuery[0].requsetOneUserId,'partner',body.coursename)
                }
            }
            return true;
        }
        return false;
      
    }
    catch(e){
        return false;
    }
}

const InsertMatchChatCourse = async (body,decodedToken) =>{
    try{
        var exec  = await mysqlConnection("insert into partnertau.course_request_match_chat (matchId,creator,message,creationDate) values (?,?,?,?)"
        , [body.matchId, decodedToken.data,body.message, new Date()]);
        if(exec && exec.insertId > 0)
        {
            let matchQuery = await matchRepository.GetMatchOnAirCourse(body.matchId)
            if(matchQuery && matchQuery.length > 0)
            {      
                if(matchQuery[0].requsetOneUserId == decodedToken.data)
                {
                    email.SendChatEmail(matchQuery[0].requsetTwoUserId,'course',body.coursename)
                }
                else
                {
                    email.SendChatEmail(matchQuery[0].requsetOneUserId,'course',body.coursename)
                }
            }
            return true;
        }
        return false;
      
    }
    catch(e){
        return false;
    }
}


const GetMatchChatPartner = async (id,decodedToken) =>{
    try{
        var exec  = await mysqlConnection("select * from partnertau.partner_request_match_chat where matchId = ?"
        , [Number(id)]);
        let chat = [];

        if(exec && exec.length > 0){
            exec.forEach(a =>{
                chat.push({
                    isMe : a.creator == decodedToken.data? true : false,
                    message : a.message,
                    creationDate : a.creationDate
                })
            })
        }
        return chat;
      
    }
    catch(e){
        return [];
    }
}

const GetMatchChatCourse = async (id,decodedToken) =>{
    try{
        var exec  = await mysqlConnection("select * from partnertau.course_request_match_chat where matchId = ?"
        , [Number(id)]);
        let chat = [];

        if(exec && exec.length > 0){
            exec.forEach(a =>{
                chat.push({
                    isMe : a.creator == decodedToken.data? true : false,
                    message : a.message,
                    creationDate : a.creationDate
                })
            })
        }
        return chat;
      
    }
    catch(e){
        return [];
    }
}



module.exports ={
    InsertMatchChatGroup: InsertMatchChatGroup,
    GetMatchChatGroup : GetMatchChatGroup,
    InsertMatchChatPartner : InsertMatchChatPartner,
    GetMatchChatPartner : GetMatchChatPartner,
    GetMatchChatCourse : GetMatchChatCourse,
    InsertMatchChatCourse : InsertMatchChatCourse,
}