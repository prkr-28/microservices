const express=require('express');
const expressproxy=require('express-http-proxy');


const app=express();

app.use('/user',expressproxy('http://localhost:3001'));
app.use('/captain',expressproxy('http://localhost:3002'));

app.listen(3000,()=>{
    console.log("Gateway server started at port 3000");
}); 