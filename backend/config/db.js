const knex = require('knex')
require('dotenv').config()  


const conn  = knex({
    client:'mysql2' , 
    connection: {
        host:process.env.DB_HOST, 
        user:process.env.DB_USER, 
        password:process.env.DB_PASS, 
        database:process.env.DB_NAME, 
        port:process.env.DB_PORT, 
        connectTimeout:1500, 
    } , 
    pool:{min:0 ,  max:10 , acquireTimeoutMillis:20000}
})

module.exports = conn