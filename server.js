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
app.use(bodyParser.urlencoded({ extended: true }));
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
	var newGuy = req.body;
	console.log(newGuy);
	console.log(fileData);

	//	The differences array is a 2-dimensional array.
	//	Each row (i) corresponds to a friend in the array.
	//	Each column (j) corresponds to each question.
	var diffs = [];

	/*	The totals array will be filled with each (total) sum of the differences 
	for each friend of all survey questions. The new person will not be added to 
	the DB until after making comparisons, so that you don't match with yourself. */
	var totals = [];

	for (var i = 0; i < fileData.length; i++) {
		//	Initialize:
		diffs.push([]);
		totals[i] = 0;

		for (var j = 0; j < newGuy.scores.length; j++) {
			diffs[i][j] = newGuy.scores[j] - fileData[i].scores[j];
			//	Difference is added to the total each time.
			totals[i] += Math.abs( diffs[i][j] );
		}
	}

	console.log(diffs);
	console.log(totals.toString());
	//	The minimum difference is the friend match.
	var matchId = totals.indexOf( Math.min( ...totals ) ) ;
	var match = fileData[matchId];
	console.log(match);
	//res.json(newGuy);
	fileData.push(newGuy);
	//console.log(fileData);
	res.json(match);
	//res.send("hello")
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
