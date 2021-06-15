const mysql = require('mysql')
const util = require('util');

//This class intializing mysql credantials, nothing you need to know but you must provide exact details
//leave host and port as//make sure port is 3306,  make sure username / passsword nad dbname is correct

var mysqlConnection = mysql.createConnection({
    host: 'db-mysql-nyc1-10638-do-user-9337719-0.b.db.ondigitalocean.com',
    user: 'TSACH',
    password: 'ri7en2pu727npm4z',
    port: 25060,
    database: 'partnertau',
    multipleStatements: true,
    insecureAuth: true,
})



const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);


module.exports = query