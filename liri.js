  
var fs = require('fs');
var request = require('request');
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var inquirer = require('inquirer');
var keys = require('./keys.js');
var client = new Twitter(keys.twitterKeys)

// META-FUNCTION: user prompted with options for a request, then program will execute request //////
function liri() {
    inquirer.prompt([{
        type: 'list',
        name: 'command',
        message: 'What would you like me to do?',
        choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says']
    }]).then(function(choice) {
        if (choice.command === 'my-tweets') {
            tweets();
        } else if (choice.command === 'spotify-this-song') {
        	inquirer.prompt(songPrompt).then(function(user){ 
            searchSpotify(user.song)
        	});
        } else if (choice.command === 'movie-this') {
        	inquirer.prompt(moviePrompt).then(function(user) {
                movie(user.movie)
            	});    
        } else if (choice.command === 'do-what-it-says') {
            says();
        }

    });
}



// displays the latest 10 tweets you made on the command line
        function tweets() { 
            var params = { screen_name: 'Chad Chaney', count: 20 };
            client.get('statuses/user_timeline', params, function(error, tweets, response) {
            		if (error) throw error;
                for (var i = 0; i < 10; i++) { 
                        console.log(tweets[i].text);
                        console.log(tweets[i].created_at);
                    
                }
            });
        }

        function searchSpotify() {
            spotify.search({ type: 'track', query: query }, function(error, data) {
                if (!error) { // if there is no error, display the following results
                    // console.log(data.tracks.items[0]);
                    if (!data.tracks) { /// FINISH THIS LINE OF CODE!!!!. if there is no error AND no data.tracks (no song added) then do this action 

                    }
                    console.log(data.tracks.items[0].artists[0].name);
                    console.log(data.tracks.items[0].name);
                    console.log(data.tracks.items[0].preview_url);
                    console.log(data.tracks.items[0].album.name);
                } else {
                    console.log(error);
                }
            });
        }

        function movie() {
            request('http://www.omdbapi.com/?t=' + query + '&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    var data = JSON.parse(body);
                    var movieObject = {
                        Title: data.Title,
                        Year: data.Year,
                        Country: data.Country,
                        Language: data.Language,
                        Plot: data.Plot,
                        Actors: data.Actors,
                        imdbRating: data.imdbRating,
                        Rotten_Tomatoes_Rating: data.tomatoRating,
                        Rotten_Tomatoes_URL: data.tomatoURL
                    };
                    console.log(movieObject);
                }
            });
        }
// Runs the program 
       
        liri();
       
