const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });


//create connection 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB
})

//connect to mysql
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySql connected')
})

module.exports = db; 