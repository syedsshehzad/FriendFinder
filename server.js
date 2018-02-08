// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fileData = require("./app/data/friends.js")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", (req, res) => {
	res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get("/api/friends/list", (req, res) => {
	res.json(fileData);
});

app.post("/api/friends", (req, res) => {
	var name = req.body;
	//console.log(name);
	//res.json(name);
	fileData.push(name);
	//console.log(fileData);
	res.send(fileData);
	//res.send("hello")
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
