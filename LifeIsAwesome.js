'use strict'


// import dependencies
let Twit = require('twit');


// YOUR PRIVATE KEYS GO HERE TO LINK WITH YOUR ACCOUNT

// var T = new Twit({
// 	consumer_key: ,
// 	consumer_secret: ,
// 	access_token: ,
// 	access_token_secret: 
// });

// working status update
// T.post('statuses/update', {status: 'Yo this is siiiccccc'}, function(err, data, response){
// 	console.log(data);
// });

// working 'GET' route to find tweets containing 'banana'
// T.get('search/tweets', { q: 'banana since:2011-07-11', count: 10 }, function(err, data, response) {
//   console.log(data);
// });

// T.post('statuses/retweet/:id', { id: '343360866131001345' }, function (err, data, response) {
//   console.log(data);
// });


function rateExceeded() {
	T.get('application/rate_limit_status', handleRateLimit);
}


function handleRateLimit(err, data, response) {
  //console.log(data.resources.friends);
	for (var key in data.resources) {
		if (data.resources.hasOwnProperty(key)) {
		  for (var smallerKey in data.resources[key]) {
		    if (data.resources[key].hasOwnProperty(smallerKey)) {
		      //console.log(smallerKey + " || Remaining:  " + data.resources[key][smallerKey].remaining);
		        if (data.resources[key][smallerKey].remaining < 5) {
		          console.log(smallerKey + " has " + data.resources[key][smallerKey].remaining + " remaining requests. Please wait 15 minutes.");
		          return;
		        }
		    }
		  }
		}
	}
  	console.log("api rate was checked, we're good.");
}



var stream = T.stream('statuses/filter', { track: ['doomsday -vault', 'death is coming', 'the end is near', 'we"re going to die', 'mass eradication', 'total extinction -6th', 'end of the planet', 'end of earth', '420 is so dank']});
 // var streamTwo = T.stream()
stream.on('tweet', handleTweet);

function handleTweet(tweet){
let userId = tweet.id_str;
rateExceeded();
console.log(tweet.text);
T.post('statuses/retweet/:id', {id: userId});

}

// T.get('search/tweets', { q: 'doomsday filter:media since:2017-05-25', count: 2 }, function(err, data, response) {
//   console.log(data);
//   });







// Heroku Setup
//====================


/*
let key = process.env.consumer_key;
let keysecret = process.env.consumer_secret;
let token = process.env.access_token;
let tokensecret = process.env.access_token_secret;
var Twitter = new twit({
    consumer_key:         key,
    consumer_secret:      keysecret,
    access_token:         token,
    access_token_secret:  tokensecret,
    });*/



