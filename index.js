var express = require("express");
var apiRouter = require("./router.js");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log(req.body) // populated!
  next()
})

var serverPort = process.env.PORT || 3000;
var dbString = process.env.MONGODB_URI || 'mongodb://localhost:27017';
mongoose.connect(dbString);

app.use("/api", apiRouter);

app.listen(serverPort);