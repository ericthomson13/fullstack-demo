import React from 'react';

class BugSubmit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	// add change handler that gets used in each field to update state
	// hopefully this can work for all fields to accept changes rather than one for each field
	// inputChangeHandler(input, location) {
	// 	location = location.toString();
	// 	this.setState(location: input)
	// }
	// use submit handler from app to do post request to server
	// render function to render component with all input fields
	render () {
		return (
			<div className="submit-bug">
				<label>Description</label>
				<input className="submit-description"></input>
				<label>Reported By</label>
				<input className="submit-reporter"></input>
				<label>Assigned To</label>
				<input className="team-member"></input>
				<label>ThreatLevel</label>
					<select id="submitList">
	          <option value="None"></option>
	          <option value="Low-Priority">Low-Priority</option>
	          <option value="Important">Important</option>
	          <option value="Critical">Critical</option>
	        </select>
				<button onClick >Submit Bug</button>
			</div>
		)
	}
}

export default BugSubmit;