//registration server with get and post methods
var express= require("express");
var server = express();
var multer = require("multer"); //npm package
var upload = multer();

server.get("/",upload.single(),function(req,res){
    console.log("GET",req);
    res.send({
        meassage : "hello world",
        data : "name",
        status : true,
        students : "All good",
    });
});

server.get("/server",function(req,res){
    res.send("hello server!");
});

server.post("/register",upload.single(),function(req,res){
 console.log("POST",req.body);
 var firstname = req.body.firstname;
 var lastname = req.body.lastname;
 var email = req.body.email;
 var password = req.body.password;
 res.send({
    message:"user registered successfully",
    status:true,
    firstname:firstname,
    lastname:lastname,
    email:email,
    password:password,
 });
});

server.listen("7000",function(){
    console.log("server running on  port 7000, http://localhost:7000");
});