var express = require("express");
var server = express();

server.get("/",function(req,res){
    res.send("hello world!")
})

server.get("/server",function(req,res){
    res.send("hello server!");
})
server.listen("5000",function(){
    console.log("server running on port 5000,http://localhost:5000");
})