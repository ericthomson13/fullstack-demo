import React from 'react';
import Nav from './Nav.jsx';
import BugTile from './BugTile.jsx';
import BugSubmit from './BugSubmit.jsx';
import exampleData from '../example-data/exampleData';
import $ from 'jquery';

import '../styles/App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: 'None',
			bugs: exampleData,
    };
		this.filterHandler = this.filterHandler.bind(this);
		this.bugFilter = this.bugFilter.bind(this);
		this.bugSubmitHandler = this.bugSubmitHandler.bind(this);
  }

  filterHandler(filter) {
    this.setState({ filter });
  }

	bugSubmitHandler(e, newBug) {
		e.preventDefault();
		// send post request
		$.post(`http://localhost:3000`, {}, (resObjData, statusStr) => {
			return resObjData.json();
		})
			.then((bug)=> {this.setState({bugs: [...this.state.bugs, bug]})})
	}

	bugFilter() {
		if (this.state.filter === 'None') {
			return this.state.bugs.map((bug) => (
				<BugTile
					bugName={bug.bugName}
					bugDescription={bug.bugDescription}
					reportedBy={bug.reportedBy}
					createdDate={bug.createdDate}
					assignedTo={bug.assignedTo}
					threatLevel={bug.threatLevel}
					key={bug.bugName}
				/>
			))
		} else {
			const filtered = this.state.bugs.filter(bug => {
				return bug.threatLevel === this.state.filter
			})
			return filtered.map(bug => {
				return (
					<BugTile
						bugName={bug.bugName}
						bugDescription={bug.bugDescription}
						reportedBy={bug.reportedBy}
						createdDate={bug.createdDate}
						assignedTo={bug.assignedTo}
						threatLevel={bug.threatLevel}
						key={bug.bugName}
					/>
				)
			})
		}
	}
  render() {
    return (
			<div>
	      <table>
	        <Nav
	          filterHandler={this.filterHandler}
	        />
	        {this.bugFilter()}
	      </table>
				<BugSubmit bugSubmitHandler={this.BugSubmitHandler}/>
			</div>
    );
  }
}

export default App;
