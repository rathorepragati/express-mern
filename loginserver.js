var express = require("express");
var app = express();
var multer = require("multer");
var upload = multer();

// app.get("/",upload.single(),function(req,res){
// res.status(200).json({message:"hello world!",status:1});
// });

app.post("/login",upload.single(),function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    if(username ==""&& password ==""){
        console.log("in if part");
        console.log("username",username);
        console.log("password",password);
    res.send({message:"Please enter your information",status:0});
    }
    else{
        console.log("in else part");
        console.log("username",username);
        console.log("password",password);
        res.send({message:"user login successfully", status:1});
    }
});

app.listen("7000",function(){
    console.log("server is running on port 7000, http://localhost:7000");
})