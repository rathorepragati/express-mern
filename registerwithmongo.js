var express = require("express");
var app = express();
var multer = require("multer");
var upload = multer();
var { MongoClient } = require("mongodb");
// const MongoClient = require('mongodb').Client;

async function createDb() {
  var url = "mongodb://0.0.0.0:27017";
  const Client = new MongoClient(url);
  var db = Client.db("admin");
  var collection = db.collection("students");
  console.log("collection", collection);
  return collection;
}
//register API endpoint
app.post("/api/register", upload.single(), async function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var M_no = req.body.M_no;

  var response = await createDb();
  console.log("response", response);

  var data = await response.insertOne({name: name, email: email, password: password,M_no:M_no});
  console.log("data", data);
  if(data){
    res.send({message:"user registered successfully",status:1});
  }
  else{
    res.send({message:"user registration failed",status:0});
  }
});

//All users data endpoint(find all user data)
app.get("/api/users",async function(req,res){
  var response = await createDb();
  var data = await response.find().toArray();
  if(data){
  console.log("all user data",data);
  res.send({message:"user fetched successfully",status:1,data:data});
  }
  else{
    res.send({message:"user not fetched",status:0});
  }
})

// login API endpoint
app.post("/api/login",upload.single(),async function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  var response = await createDb();
  var data = await response.find({email:email}).toArray();
  console.log("data",data);
  if(data.length>0){
    if(email==data[0].email && password==data[0].password){
      res.send({message:"user login successful",status:1});
    }
    else{
      res.send({message:"please enter correct email or password",status:0});
    }
  }else{
    res.send({message:"you are not registered with us please register first",status:0})
  }
});

//specific user data endpoint
app.get("/api/users/:email",async function(req,res){
console.log("req.params=",req.params);
var email = req.params.email;
console.log("email=",email);
var response = await createDb();
var data = await response.findOne({email: email});
// console.log("data=",data.length);
if(data.email){
  console.log("specific user data",data);
  res.send({message:"user fetched successfully",status:1,data:data});
}else{
  res.send({message:"user not found",status:0});
}
});

//delete user API endpoint
app.post("/api/delete/:email", async function(req, res) {
console.log("req.params=",req.params);
var email = req.params.email;
var response = await createDb();
var data = await response.find({email:email}).toArray();
console.log("data=",data.length);
if(data.length){
  var data = await response.deleteOne({email:email});
  if(data){
    console.log("all user data",data);
    res.send({messages:"user deleted successfully",status:1,data:data});
  }
  else{
    res.send({messages:"user not deleted successfully",status:0});
  }
}
else{
  res.send({messages:"user not found",status:0})
}
});

//Update user API endpoint
app.post("/api/update/:email",upload.single(),async function(req,res){
console.log("req.params=",req.params);
var email = req.params.email;
var newEmail = req.body.newEmail;
// var name = req.body.name;
var response = await createDb();
var data = await response.find({email:email}).toArray();
console.log("data=",data.length);
if(data.length){
  var data = await response.updateMany({email:email},{$set:{email:newEmail}});
  if(data){
    console.log("all user data=",data);
    res.send({message:"user updated successfully",status:1,data:data});
  }
  else{
    res.send({message:"user not updated successfully",status:0});
  }
}
else{
  res.send({message:"user not found",status:0});
}
});

//Reset_Password API endpoint
app.post('/api/user/reset_password',upload.single(), async function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  var response = await createDb();
  var data = await response.find({email:email}).toArray();
  console.log("data=",data.length);
  if(data.length>0)
  {
    var result= await response.updateMany({email:email},{$set:{email:email,password:password}});
  
if(result.modifiedCount ==1){
  console.log("user data",data);
res.send({message:"password updated successfully",status:1});
}else{
  res.send({message:"password not updated successfully",status:0})
}
}else{
  res.send({message:"user not found",status:0});
}
});

app.listen("8000",function(){ 
console.log("server run on http://localhost:8000")
});

