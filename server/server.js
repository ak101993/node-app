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
    //server emit a newMessage event and the client listen to that event
    // socket.emit('newMessage',{
    //    from: 'a.kumar',
    //    text: 'This is return mail'
    // });

    // create a emit event to show the greeting message of the admin
    socket.emit('newMessage',{
          from: 'Admin',
          text: 'Welcome to chat box',
          createdAt: new Date().getTime()
    });
    //create a broadcast event to show the the user who joined the chat

    socket.broadcast.emit('newMessage',{
      from: 'Admin',
      text: 'New user joined',
      createdAt: new Date().getTime()
    });

    socket.on('createMessage',(createMessage)=>{
        console.log('createMessage',createMessage);
        io.emit('newMessage',{
           from: createMessage.from,
           text: createMessage.text,
           createdAt: new Date().getTime()
        });
        //broadcast event helps to broadcast the message to  all the users
        // except the one calling it
        // socket.broadcast.emit('newMessage',{
        //   from: createMessage.from,
        //   text: createMessage.text,
        //   createdAt: new Date().getTime()
        // });
    })
    socket.on('disconnect',()=>{
        console.log('Disconnected from server');
    })
})
port=process.env.PORT || 4000;
server.listen(port,()=>{

   console.log(`Server is up on port ${port}`);
})
