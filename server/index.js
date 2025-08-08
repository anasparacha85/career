const express =require('express');
const connectdb = require('./config/db');
const bodyParser=require('body-parser')
const cors=require('cors');
const TestRouter = require('./routes/TestRoute');
const InvitationRouter = require('./routes/InvitationRoute');
const AdminRouter = require('./routes/AdminRoute');
require('./config/CloudinaryConfig')
const server=express()
server.use(cors())

server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/api/admin',AdminRouter)
server.use('/test',TestRouter)
server.use('/invite',InvitationRouter)


require('dotenv').config()
const PORT=process.env.SERVER_PORT || 5000
connectdb().then(()=>{server.listen(PORT,()=>{
    console.log('server started');
    
})})