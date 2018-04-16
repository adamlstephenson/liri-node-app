require("dotenv").config();

var fs = require("fs");
var keys = require("./key.js");
var request = require("request");

 var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2]

// Command Logic =======================================================================================

if(command === "my-tweets") {
    displayTweets()
}
else if(command === "spotify-this-song") {
    showSong()
}
else if(command === "movie-this") {
    showMovie()
}
else if(command === "do-what-it-says") {
    doWhat()
}

// Functions ============================================================================================

function displayTweets() {
    request("https://api.twitter.com/1.1/statuses/retweets_of_me.json", function(error, response, body) {
        //console.log(response)
        if(!error && response.statusCode === 200) {
           // console.log(body)
        }

    })
}

function showSong() {

}

function showMovie() {

}

function doWhat() {

}