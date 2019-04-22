require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var request = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

switch (request) {
  case "spotify-this-song":
    spotifyThis();
    break;
  
  case "movie-this":
    omdbThis();
    break;
  
  case "concert-this":
    bitThis();
    break;
  
  case "do-what-it-says":
    doIt();
    break;
  }
