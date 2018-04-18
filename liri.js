require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
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

    var params = {screen_name: 'MrSnakeFavre'};

    client.get("https://api.twitter.com/1.1/statuses/home_timeline.json", params, function(error, tweets, response) {
 
        if(!error && response.statusCode === 200) {
            for(let i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                var tweetText = tweets[i].text;
                var userName = tweets[i].user.name;

                console.log(userName)
                console.log(tweetText)
                console.log(date)
                console.log("===============================")

            }
        }

    })
}

function showSong() {

}

function showMovie() {

}

function doWhat() {

}