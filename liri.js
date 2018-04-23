require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var keys = require("./key.js");
var request = require("request");
var omdb = require("omdb");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var searchTerm = process.argv[3];

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

    if (searchTerm === undefined) {
        searchTerm = "The Sign Ace";
    }

    spotify.search({type: "track", query: searchTerm}, function(error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
          }

        var songName = data.tracks.items[0].name;
        var artist = data.tracks.items[0].artists[0].name;
        var albumName = data.tracks.items[0].album.name;
        var previewLink = data.tracks.items[0].preview_url;

        console.log("Song Title: " + songName)
        console.log("Artist: " + artist)
        console.log("Album Name: " + albumName)
        console.log("Preview Link: " + previewLink)
        console.log("==========================================================================================================================")
    })

}

function showMovie() {

    if (searchTerm === undefined) {
        searchTerm = "Mr. Nobody";
    }
    
    request("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("The movie's title: " + JSON.parse(body).Title);
            console.log("The movie's release date: " + JSON.parse(body).Released);
            console.log("The movie's actors: " + JSON.parse(body).Actors);
            console.log("The movie's plot: " + JSON.parse(body).Plot);
            console.log("The movie's language: " + JSON.parse(body).Language);
            console.log("The movie's imdb rating: " + JSON.parse(body).imdbRating);
            console.log("The movie's rotten tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("===============================")
        } else {
            console.log(error)
        }
    })

}
function doWhat() {

        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                console.log(error)
            }

            var splitData = data.split(", ");
            var newCommand = splitData[0];
                searchTerm = splitData[1];
                console.log(searchTerm);

            if(newCommand === "my-tweets") {
                displayTweets()
            }
            else if(newCommand === "spotify-this-song") {
                showSong()
            }
            else if(newCommand === "movie-this") {
                showMovie()
            }
            else if(newCommand === "do-what-it-says") {
                console.log("You're throwing me for a loop!")
            }
        })
}