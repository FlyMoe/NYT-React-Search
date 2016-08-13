// Include React 
var React = require('react');

// This is the results component
var Search = React.createClass({

	// Here we render the function
	render: function(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Search</h3>
				</div>
				<div className="panel-body text-center">
					<h4 className=""><strong>Topic</strong></h4>
					<input type="text" className="form-control text-center" id="topic" onChange= {this.handleChange} required/>
					
					<h4 className=""><strong>Start Year</strong></h4>
					<input type="text" className="form-control text-center" id="start_year" onChange= {this.handleChange} required/>

					<h4 className=""><strong>End Year</strong></h4>
					<input type="text" className="form-control text-center" id="end_year" onChange= {this.handleChange} required/>	

					<br />
					<button type="button" className="btn btn-primary" onClick={this.handleClick}>Search</button>

					<h1>Address:</h1>
					<p>{this.props.address}</p>

				</div>
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Search;