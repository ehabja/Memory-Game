var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Memory",{useNewUrlParser: true}, function(err, database){
    if(err){
        console.log("Error: " + err);
    }
    else {
        console.log("Wer'e connected to: MongoDB, Database: " + database.name);
    }
});

var Game = mongoose.model("Game", {
    name: String,
    startTime: Date,
    endTime: Date,
    duration: Number,
    steps: Number
});

app.post("/score", function (request, response) {
    var game = new Game(request.body);
    game.duration = Math.floor((game.endTime - game.startTime)/1000);
    game.save(function (err, game) {
        if (err) {
            console.log("Error: " + err);
            response.status(500);
            response.send(err);
        }
        else {
            response.status(201); 
            response.send(game);
        }
    });
});

app.get("/score", function(request, response){
    Game.find({}, function(err, games){
        if(err){
            console.log("Error: "+ err);
            response.status(500)
            response.send(err);
        }
        else{
            response.send(games);
        }
    });
});

app.delete("/score/:_id", function (request, response) {
    Game.remove({ _id: request.params._id }, function (err, info) { 
        if (err) {
            console.log("Error: " + err);
            response.status(500);
            response.send(err);
        }
        else {
            console.log(info);
            response.status(204);
            response.send();
        }
    });
});

app.listen(3000, function(){
    console.log("listening on http://localhost:3000");
});