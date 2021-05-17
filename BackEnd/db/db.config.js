const mysql = require('mysql')
const util = require('util');

//check
//This class intializing mysql credantials, nothing you need to know but you must provide exact details
//leave host and port as//make sure port is 3306,  make sure username / passsword nad dbname is correct

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567',
    port: 3306,
    database: 'partnertau',
    multipleStatements: true,
    insecureAuth: true,
})


const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);


module.exports = query