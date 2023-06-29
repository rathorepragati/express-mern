var express = require("express");
var app = express();
var multer = require("multer");
var upload = multer();
const { MongoClient } = require("mongodb");
// const MongoClient = require('mongodb').Client;
async function createdb() {
  var url = "mongodb://0.0.0.0:27017/";
  const client = new MongoClient(url);
  var db = client.db("admin");
  var collection = db.createCollection("students");
  console.log("collection", collection);
  return collection;
}

app.post("/dbconnect", upload.single(), async function (req, res) {
  var name = req.body.name;
  var result = await createdb();
  console.log("result", result);
  var response = await result.insertOne({ name: name });
  res.send({ message: "register successfully", status: 1, data: name });
});

app.listen("7000", function () {
  console.log("server running on http://localhost:7000");
});