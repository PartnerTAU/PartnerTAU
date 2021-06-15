const mysqlConnection = require('../db/db.config')

const GetWhatsappLinkByCourseAndSemester = async (coursenumber, semester) =>{
    try{
        var exec  = await mysqlConnection("select * from partnertau.whatsapp where coursenumber = ? and semester = ?"
        , [coursenumber, semester]);
        if (exec && exec.length > 0){
            return exec[0];
        }
        else{
            return null;
        }
    }
    catch(e){
        return null
    }
}

const UpdateWhatsappLinkByCourseAndSemester = async (body) =>{
    try{
        var exec  = await mysqlConnection("update partnertau.whatsapp set link = ? where id = ?"
        , [body.link, body.id]);
        if(exec && exec.length > 0)
        {
            return true;
        }
        return false;
    }
    catch(e){
        return false;
    }
}

const SetWhatsappLinkByCourseAndSemester = async (body) =>{
    try{
        var exec  = await mysqlConnection("insert into partnertau.whatsapp (coursenumber, semester, link) values (?,?,?)"
        , [body.coursenumber, body.semester, body.link]);
        if(exec && exec.length > 0)
        {
            return true;
        }
        return false;
    }
    catch(e){
        return false;
    }
}

module.exports ={
    GetWhatsappLinkByCourseAndSemester:GetWhatsappLinkByCourseAndSemester,
    SetWhatsappLinkByCourseAndSemester:SetWhatsappLinkByCourseAndSemester,
    UpdateWhatsappLinkByCourseAndSemester:UpdateWhatsappLinkByCourseAndSemester,
}