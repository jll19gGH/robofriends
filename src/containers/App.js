import React from 'react';
import './App.css';
import CardList from '../components/CardList';
import Card from '../components/Card';
import SearchBox from '../components/SearchBox';

const state = {
	robots: [],
	searchfield: '',
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: '',
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => {
			return response.json();
		})
		.then(users => {this.setState({robots: users})});
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value});
	}
	render() {
		//const { robots, searchfield } = this.state;
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		});

		if(this.state.robots.length === 0)
		{
			return (
					<div className='tc'>
						<h1 className='f1'>RoboFriends</h1>
						<h1 className='f2 content'>Loading...</h1>
					</div>
				);
		}
		else {
			return (
				<div className='tc'>
					<div className='sticky'>
						<h1 className='f1'>RoboFriends</h1>
						<SearchBox searchChange={this.onSearchChange}/>
					</div>
					<div className='content'>
						<CardList robots={filteredRobots}/>
					</div>
				</div>
			);
		}
	}
}

export default App;