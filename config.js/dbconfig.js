//build a connection to the database
const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myalbumdb'    
})

module.exports = pool