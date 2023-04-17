
require('dotenv').config()
// require('dotenv/config')
const Pool = require('pg').Pool


const pool = new Pool({
    
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'AI_paintings'
})

module.exports = pool
