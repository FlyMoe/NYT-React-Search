// Include React 
var React = require('react');

// Here we include all of the sub-components
var Search = require('./Children/Search');
var Results = require('./Children/Results');
var Saved = require('./Children/Saved');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			title: "",
			startYear: "",
			endYear: "",
			results: "",
			query: "",
			deleted: {},
			saved: []
		}
	},
	// This function allows childrens to update the parent.
	setTerm: function((title, startYear, endYear){
		this.setState({
			title: title,
			startYear: startYear,
			endYear: endYear
		})
		// Call the runQuery function in helpers.js	
		helpers.runQuery(title, startYear, endYear)
			.then(function(data) {
				// set the state of NYTimes data
				this.setState({results: data});
		// Bind object
		}.bind(this));
	},	
	getArticlesFromHelpers: function() {		
		// Call the getArticles function in helpers.js	
		helpers.getArticles()
			.then(function(response) {
				console.log(response);
				// Save the articles
				this.setState({
					saved: response.data
				})				
		}.bind(this));

	},
	// Update the parent from the child
	setArticles: function(article) {
		this.setState({
			query: article.Title
		});

	},
	// Delete the parent from the child
	setDeleteArticles: function(deleted) {
		this.setState({
			deleted: deleted
		});
	},
	// Get all the articles in the database
	componentDidMount: function() {		
		this.getArticlesFromHelpers();
	},
	// Here we render the function
	render: function(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2 className="text-center">New York Times Article Scrubber!</h2>
						<p className="text-center"><em>Search for and annotate articles of interest!.</em></p>
					</div>

					<div className="col-md-8 col-md-offset-2">
					
						<Search setTerm={this.setTerm}/>

					</div>

				</div>

				<div className="row">

					<div className="col-md-8 col-md-offset-2">
				
						<Results article={this.state.results} />

					</div>

				</div>

				<div className="row">

					<div className="col-md-8 col-md-offset-2">

						<Saved saved={this.state.saved}/> 

					</div>

				</div>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;