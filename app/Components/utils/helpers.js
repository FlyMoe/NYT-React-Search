// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	// This function serves our purpose of running the query to geolocate. 
	runQuery: function(title, startYear, endYear){

		console.log(location);

		// NYTimes API Key
		var authKey = "2595957b1f614595bb6d46f2084af190";

		//NYTime API call
		var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey; 

		return new Promise(function(resolve, reject) {
			axios.get(queryURL)
				.then(function(response){
					console.log(response);
					var results =[];
					for (var i = 0; i < response.data.response.docs.length; i++) {
						results.push({
							title: response.data.response.docs[i].headline.main, 
							date: response.data.response.docs[i].pub_date, 
							url: response.data.response.docs[i].web_url
						});
					}
			});
		});
	},
	// Save Articles to Database
	saveArticle: function(article){
		return axios.post('/api', article)
			.then(function(results){
				console.log("Inserted to database");
			})
	},
	// Get all the articles from the DB
	getArticles: function() {
		return axios.get('/api')
			.then(function(response) {
				// return the response
				return response;
		});
	},

	// This function posts new searches to our database.
	postHistory: function(location){
		return axios.post('/api', {location: location})
			.then(function(results){
				console.log("Insert into DB");
				return(results);
			});
	}
}


// We export the helpers function 
module.exports = helpers;