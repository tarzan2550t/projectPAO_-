const express = require('express')
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors =require('cors')

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static('uploads'))



readdirSync('./router').map((r) => app.use('/api' , require(`./router/${r}`)))

app.use((req,res,next)=>{
    const err = new Error('Not Found Path 404')
    err.status = 404
    next(err)
})


app.use(require('./middleware/error'))

module.exports = app