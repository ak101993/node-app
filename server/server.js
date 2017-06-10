const express=require('express');
const path=require('path');
var app=express();
var publicPath;
var port;
publicPath=path.join(__dirname +'/../public');
//middleware
app.use(express.static(publicPath));
//port for deployment
port=process.env.PORT || 3000;
app.listen(port,()=>{

   console.log(`Server is up on port ${port}`);
})
