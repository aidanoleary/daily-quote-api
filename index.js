var express = require("express");
var apiRouter = require("./router.js");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var Strategy = require('passport-http').BasicStrategy;
var cors = require('cors');

var app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log(req.body) // populated!
  next()
})

// Setup cors
app.use(cors());

passport.use(new Strategy(function(username, password, done) {
  if(username === "user1" && password === "h3ll0w0rld3") {
    return done(null, true);
  }
  else {
    return done(null, false);
  }
}));

var serverPort = process.env.PORT || 3000;
var dbString = process.env.MONGODB_URI || 'mongodb://localhost:27017';
mongoose.connect(dbString);

app.get("/", function(req, res) {
  res.write("<h1 style='color: red;'>Random Quote App</h1>");
  res.end();
});

app.use("/api", apiRouter);

app.listen(serverPort);