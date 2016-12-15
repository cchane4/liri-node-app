 
var action = process.argv[2]; 
var fs = require('fs');
var request = require('request');  
var query = "";
var nodeSubject = process.argv;
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');


function combineQuery(){ 
	for (var i = 3; i < nodeSubject.length; i++){ 
		query +=  nodeSubject[i] + " ";
	} 
}

var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
}); 

function tweets(){
	var params = { screen_name: 'Chad Chaney', count: 20 };
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		for (var i = 0; i < 10; i++){
			if(!error) {
				console.log(tweets[i].text);
				console.log(tweets[i].created_at);
			} else {
				console.log(error);
			}
		}
	});
} 
// tweets(); 
function searchSpotify(){
	spotify.search({type: 'track', query: query}, function(error, data){
		if (!error){
			// console.log(data.tracks.items[0]);
			console.log(data.tracks.items[0].artists[0].name);
			console.log(data.tracks.items[0].name);
			console.log(data.tracks.items[0].preview_url);
			console.log(data.tracks.items[0].album.name);
		} else {
			console.log(error);
		}
	});
}

function movie(){  
console.log(query); 	
	request('http://www.omdbapi.com/?t='+ query +'&y=&plot=short&tomatoes=true&r=json', function(error, response, body){
		if (!error && response.statusCode === 200) {
			var data = JSON.parse(body);
			// console.log(data); 
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
	  		 	// console.log(data.Title, data.Year, data.Country, data.Language, data.Plot, data.Actors, data.imdbRating); 
	  		}
	});
 }

/*function says(){
	fs.readFile("random.txt", "utf8", function(err,data){ 
	}); 
} */

function runLiri() {
	combineQuery();
	if (action === 'my-tweets'){ 
		tweets(); 
	} else if (action === 'spotify-this-song'){ 
		searchSpotify(); 
	} else if (action ==='movie-this'){ 
		movie(); 
	} else if (action ==='do-what-it-says'){ 
		says(); 
	} 
}
runLiri();
 // should probably use a switch-case statement here 