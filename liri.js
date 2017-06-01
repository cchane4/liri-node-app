  var fs = require('fs');
  var request = require('request');
  var keys = require('./keys.js');
  var Twitter = require('twitter');
  var spotify = require('spotify');
  var inquirer = require('inquirer');
  var keys = require('./keys.js');
  var client = new Twitter(keys.twitterKeys);

  // META-FUNCTION: user prompted with options for a request, then program will execute request //////
  function liri(user) {
      if (user.command === 'spotify-this-song') {
          spotifyNow(user);

      } else if (user.command === 'movie-this') {
          moviePlease(user);

      } else if (user.command === 'my-tweets') {
          tweets();

      } else {
          // If the other options weren't chosem, LIRI takes a command pre-written in random.txt
          fs.readFile('./random.txt', 'utf8', function(err, data) {
              // Log any errors to the console
              if (err) {
                  console.log(err);
              } else {
                  // Break the string down by comma separation and store the contents into the output array.
                  var output = data.split(',');

                  // set the user keys of importance to the piece in the array
                  user.command = output[0];
                  user.search = output[1];

                  // Recursively summon the brains
                  liri(user);
              }
          });
      }

      // Log searches to log.txt
      var logTxt = 'A user entered: ' + user.technology + ' ' + user.search + '\n';

      fs.appendFile('log.txt', logTxt);
  }


  // LIR'S CLI functionality 
  inquirer.prompt([{
          type: 'list',
          name: 'command',
          message: 'What would you like me to do?',
          choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says']
      }, {
          type: 'input',
          message: 'What song you want me to look for?',
          name: 'search',
          default: 'The Sign Ace of Base',
          when: function(answers) {
              return answers.command === 'spotify-this-song';
          }
      }, { // Only displays if OMDB was selected

          type: 'input',
          message: 'What movie you want me to look for?',
          name: 'search',
          default: 'Mr. Nobody',
          when: function(answers) {
              return answers.command === 'movie-this';
          }
      },
      // Asks for confirmation 
      {
          type: 'confirm',
          message: 'Are you sure:',
          name: 'confirm',
          default: true

      }
  ]).then(function(user) {
      // If the user confirms, this is promised to happen next
      if (user.confirm) {
          // Call the brains
          liri(user);
      } else {

          console.log('Goodbye!!');
      }

  }).catch(function(e) {
      console.log(e);
  });

  // displays the latest 10 tweets you made on the command line
  function tweets() {
      var params = { screen_name: 'Chad Chaney', count: 10 }; //replace with your twittername
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (error) throw error;
          for (var i = 0; i < 10; i++) {
              console.log(tweets[i].text);
              console.log(tweets[i].created_at);

          }
      });
  }

  function spotifyNow(goodSong) {
      spotify.search({ type: 'track', query: goodSong.search }, function(err, data) {
          if (err) {
              console.log('Error occurred: ' + err);
              return;
          } else {
              console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
              console.log("Song name: " + data.tracks.items[0].name);
              console.log("Preview Song: " + data.tracks.items[0].preview_url);
              console.log("Album: " + data.tracks.items[0].album.name);
          }
      });
  }

  function moviePlease(movie) {
      //var query = movie.search.replace(/ /g, '+');
      request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
          if (error) {
              console.log("An Error occurred" + error);
              return;
          } else if (!error && response.statusCode === 200) {
              var jsonData = JSON.parse(body);
              var movieLog = "Title: " + jsonData.Title +
                  "\nYear: " + jsonData.Year +
                  "\nRated: " + jsonData.Rated +
                  "\nIMDB Rating: " + jsonData.imdbRating +
                  "\nCountry: " + jsonData.Country +
                  "\nLanguage: " + jsonData.Language +
                  "\nPlot: " + jsonData.Plot +
                  "\nActors: " + jsonData.Actors +
                  "\nRotten Tomatoes Rating: " + jsonData.tomatoRating +
                  "\nRotton Tomatoes URL: " + jsonData.tomatoURL;
              console.log(movieLog);

          }
      });
  }
