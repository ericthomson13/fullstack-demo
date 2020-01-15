import React from 'react';
import Nav from './Nav.jsx';
import BugTile from './BugTile.jsx';
import exampleData from '../example-data/exampleData';

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
  }

  filterHandler(filter) {
    this.setState({ filter });
  }

	bugFilter() {
		console.log('filter: ' + this.state.filter)
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
			console.log('filtered bugs: ' + filtered[0].threatLevel)
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
      <table>
        <Nav
          filterHandler={this.filterHandler}
        />
        {this.bugFilter()}
      </table>
    );
  }
}

export default App;
