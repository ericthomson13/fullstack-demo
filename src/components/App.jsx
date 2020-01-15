import React from 'react';
import Nav from './Nav.jsx';
import BugTile from './BugTile.jsx';
import BugSubmit from './BugSubmit.jsx';
// import exampleData from '../example-data/exampleData';

import '../styles/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'None',
			bugs: [],
    };
		this.filterHandler = this.filterHandler.bind(this);
		this.bugFilter = this.bugFilter.bind(this);
		this.bugSubmitHandler = this.bugSubmitHandler.bind(this);
		this.getBugs = this.getBugs.bind(this);
  }

  filterHandler(filter) {
    this.setState({ filter });
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

	bugSubmitHandler (e, newBug) {
		e.preventDefault();
		// send post request
		fetch('http://localhost:3000/bugs', {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {'content-Type': `application/json` },
			body: JSON.stringify(newBug)
		})
			.then(result => {
				result = result.json();
				this.setState({bugs: [...this.state.bugs, result]})
			})
			.catch(err => console.log(err))
	}

	getBugs () {
		fetch(`http://localhost:3000/bugs`)
			.then( result => {
				result = result.json();
				console.log('results of get fetch: ' + result)

				this.setState({bugs: result})
			})
			.catch(err => console.log(err));
	}
	
	componentDidMount() {
		console.log('component did mount running ')
		this.getBugs();
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
