const express=require('express');
const http=require('http');
const socketIO=require('socket.io');
const path=require('path');
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
var publicPath;
var port;
publicPath=path.join(__dirname +'/../public');
//middleware
app.use(express.static(publicPath));
//port for deployment
io.on('connection',(socket)=>{
    console.log(`New user connected ${socket}`);
    socket.on('disconnect',()=>{
        console.log('Disconnected from server');
    })
})
port=process.env.PORT || 4000;
server.listen(port,()=>{

   console.log(`Server is up on port ${port}`);
})
