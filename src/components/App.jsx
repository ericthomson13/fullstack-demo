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
			filtered: []
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
			return this.state.bugs.map((bug) => {
				if (bug.id === undefined) {
					Math.floor(Math.Random * 100)
				}
			return (
				<BugTile
					// issue is with bugName below
					bugName={bug.id}
					bugDescription={bug.description}
					reportedBy={bug.reporter}
					creationTime={bug.creationTime}
					assignedTo={bug.assignment}
					threatLevel={bug.threatLevel}
					key={bug.id}
				/>
			)})
		} else {
			const filtered = this.state.bugs.filter(bug => {
				return bug.threatLevel === this.state.filter
			})
			return filtered.map(bug => {
				if (bug.id === undefined) {
					bug.id = Math.floor(Math.Random * 100);
				}
				return (
					<BugTile
						bugName={bug.id}
						bugDescription={bug.description}
						reportedBy={bug.reporter}
						creationTime={Date.parse(bug.creationTime)}
						assignedTo={bug.assignment}
						threatLevel={bug.threatLevel}
						key={bug.id}
					/>
				)
			})
		}
	}

	bugSubmitHandler (e, newBug) {
		e.preventDefault();
		// send post request
		console.log('newBug: ' + newBug)
		fetch('http://localhost:3000/bugs', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(newBug)
		}, () =>{ console.log('submit fetch is not a lame dog lost in the internet')})
			.then(result => {
				result = result.json();
			})
				.then( result => {
					return this.setState({bugs: [...this.state.bugs, result]})
				})
			.catch(err => console.log(err))
	}

	getBugs () {
		// console.log('getBugs has started')
		fetch(`http://localhost:3000/bugs`)
			.then( response => {
				// console.log('fetch has completed')
				return response.json();
			})
				.then(result => {
					// console.log('results of get fetch: ' + Object.keys(result[0]))
					this.setState({bugs: result})
				})
				.catch(err => console.log(err));
	}
	
	componentDidMount() {
		// console.log('component did mount running ')
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
				<BugSubmit bugSubmitHandler={this.bugSubmitHandler}/>
			</div>
    );
  }
}

export default App;
