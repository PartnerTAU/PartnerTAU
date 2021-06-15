const mysqlConnection = require('../db/db.config')

const CreateUserDetails = async (email,userid) =>{
    try{
        var exec  = await mysqlConnection("insert into partnertau.user_details (userid,email) values (?,?)"
        , [userid, email]);
        
    }
    catch(e){
       
    }
}

const GetUserDetails = async (userid) =>{
    try{
        var exec  = await mysqlConnection("select * from partnertau.user_details where userid = ?"
        , [userid]);
        return exec[0].email;
    }
    catch(e){
        return null
    }
}



module.exports ={
    GetUserDetails: GetUserDetails,
    CreateUserDetails : CreateUserDetails
}