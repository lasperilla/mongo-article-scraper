// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Comment and Article models
var Comment = require("./models/Comment.js");
var Article = require("./models/Article.js");


// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();
var PORT = process.env.PORT || 8080;

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/articlescrape");
// mongoose.connect("mongodb://heroku_f132x8p4:fffgpjj97heu35t5bjdtd04ik6@ds123722.mlab.com:23722/heroku_f132x8p4");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Routes =============================================================

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Listen on port 8080
app.listen(PORT, function() {
  console.log("App running on port "+PORT+"!");
});
