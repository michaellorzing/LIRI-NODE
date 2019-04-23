require("dotenv").config();
var moment = require("moment");
const Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
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

function spotifyThis() {
  if (userInput === ""){
    userInput = "The Sign"
  }
  spotify.search({ type: "track", query: `${userInput}`}, function (error, data){
    if (error) {
      console.log (error)
    }
    else {
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Title: " + data.tracks.items[0].name);
      console.log("Preview: " + data.tracks.items[0].preview_url);
      console.log("Album: " + data.tracks.items[0].album.name);
    }
  })
}

// function spotifyThis() {
//   spotify.search({
//     type: "track",
//     query: `${userInput}`
//   }, function (error, data) {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log("Artist: " + data.tracks.items[0].artists[0].name);
//       console.log("Title: " + data.tracks.items[0].name);
//       console.log("Preview: " + data.tracks.items[0].preview_url);
//       console.log("Album: " + data.tracks.items[0].album.name);
//     }
//   })
// };


function omdbThis() {
  if (userInput === "") {
    axios.get(`http://www.omdbapi.com/?t=mr+nobody&apikey=trilogy`).then(
      function (response) {
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log(response.data.Ratings[0]);
        console.log(response.data.Ratings[1]);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
      }
    )
  } else {
    axios.get(`http://www.omdbapi.com/?t=${userInput}&apikey=trilogy`).then(
      function (response) {
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log(response.data.Ratings[0]);
        console.log(response.data.Ratings[1]);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
      }
    )
  }
}

function bitThis() {
  axios.get(`https://rest.bandsintown.com/artists/${userInput.trim()}/events?app_id=codingbootcamp`).then(
    function (response) {
      for (var i = 0; i < response.data.length; i++) {
        console.log("=============================")
        console.log(response.data[i].venue.name);
        console.log(response.data[i].venue.city);
        console.log(moment(response.data[i]).format("MM-DD-YYYY"));
        console.log("=============================")
      }
    }
  )
}

function doIt() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    dataArr = data.split(",");
    request = dataArr[0];
    userInput = dataArr[1];
    if (request === "spotify-this-song") {
      spotifyThis();

    } else if (request === "movie-this") {
      omdbThis();

    } else if (request === "concert-this") {
      console.log(userInput)
      bitThis();

    } else {
      return console.log(error)
    }
  })
}