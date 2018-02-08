// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/home.html"));
});

app.get("/survey", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/survey.html"));
});

app.get("/api/friends/list", (req, res) => {
	res.send("HELLO!");
});

app.post("/api/friends", (req, res) => {
	var name = req.body;
	console.log(name);
	res.json(name);
	//res.send(req.params);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
