import React from 'react';

class BugSubmit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			description: '',
			reporter: '',
			assignment: '',
			threatLevel: 'None',
		}
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
	}
	// add change handler that gets used in each field to update state
	// hopefully this can work for all fields to accept changes rather than one for each field
	inputChangeHandler(input, location) {
		this.setState({location: input})
	}
	// use submit handler from app to do post request to server
	// render function to render component with all input fields
	render () {
		return (
			<form className="submit-bug">
				<label>Description</label>
				<input className="submit-description" onChange={(e) => this.inputChangeHandler(e.target.value, 'description')}></input>
				<label>Reported By</label>
				<input className="submit-reporter" onChange={(e) => this.inputChangeHandler(e.target.value, 'reporter')}></input>
				<label>Assigned To</label>
				<input className="assignment" onChange={(e) => this.inputChangeHandler(e.target.value, 'assignment')}></input>
				<label>ThreatLevel</label>
					<select id="submitList" onChange={(e) => this.inputChangeHandler(e.target.value, 'threatLevel')}>
	          <option value="None"></option>
	          <option value="Low-Priority">Low-Priority</option>
	          <option value="Important">Important</option>
	          <option value="Critical">Critical</option>
	        </select>
				<button 
					onClick={(e) => { e.preventDefault(); this.props.bugSubmitHandler(e, this.state)}}>Submit Bug</button>
			</form>
		)
	}
}

export default BugSubmit;