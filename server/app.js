const dotenv = require("dotenv");
const mongoose = require("mongoose"); 
const express = require("express");
const { builtinModules } = require("module");
const app = express();
require("./config/keys")



require("./db/conn");

app.use(express.json());

app.use(require("./router/auth"));
app.use(require("./router/post"));

const PORT = process.env.PORT  || 5000;



// app.get("/",(req,res)=>{ 
//     res.send("hello from the server");
// })
if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running at ",PORT);
})