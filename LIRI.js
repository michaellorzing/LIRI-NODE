require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
// const Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);

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

// function spotifyThis() {
//   axios.get(`https://api.spotify.com/v1/search?q=${userInput}`).then(
//     function (response) {
//       console.log(response.data);
//     }
//   )
// }

function omdbThis() {
  if(userInput===""){
    axios.get(`http://www.omdbapi.com/?t=mr+nobody&apikey=trilogy`).then(
      function(response){
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
  axios.get(`https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`).then(
    function(response){
    console.log(response.data)
    }
  )
}