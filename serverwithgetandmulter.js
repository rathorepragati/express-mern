var express = require("express");
var server = express();
var multer = require("multer");
var upload = multer();
//get method
server.get("/",upload.single(), function(req, res){
console.log("get",req);
var name = req.body.name;
res.send({message:"hello world",data:name,status:true,students:"all good"})
});
server.get('/server',function(req, res){
    res.send("hello server!");
});
server.listen(6000,function(){
console.log("server running on port 6000,http://localhost:6000/");
});


























