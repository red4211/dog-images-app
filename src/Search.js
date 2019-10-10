import React, { Component } from "react";
import SuggestionsList from "./SuggestionsList";
class Search extends Component {
	state = {
		activeSuggestion: 0,
		filteredSuggestions: [],
		showSuggestions: false,
		searchText: ""
	};

	handleChange = e => {
		const targetName = e.target.name;
		const targetValue = e.target.value;
		const { suggestions } = this.props;
		let filteredSuggestions = "";
		if (targetValue.length > 1) {
			filteredSuggestions = suggestions.filter(
				elem =>
					elem.toLowerCase().indexOf(targetValue.toLowerCase()) > -1
			);

			this.setState({
				activeSuggestion: 0,
				showSuggestions: true,
				filteredSuggestions: filteredSuggestions,
				[targetName]: targetValue
			});
		} else {
			this.setState({
				[targetName]: targetValue,
				showSuggestions: false
			});
		}
	}; //

	handleSubmit = e => {
		e.preventDefault();
		const test = this.state.searchText;
		this.props.outerHandler(test);
	};

	onClick = e => {
		this.setState({
			activeSuggestion: 0,
			filteredSuggestions: [],
			showSuggestions: false,
			searchText: e.target.textContent
		});
	};

	onKeyDown = e => {
		const { activeSuggestion, filteredSuggestions } = this.state;
		if (e.keyCode === 13 && this.state.showSuggestions) {
			this.setState({
				activeSuggestion: 0,
				showSuggestions: false,
				searchText: filteredSuggestions[activeSuggestion]
			});
		} else if (e.keyCode === 38) {
			//up arrow
			if (activeSuggestion === 0) {
				return;
			}

			this.setState({ activeSuggestion: activeSuggestion - 1 });
		}
		//down arrow
		else if (e.keyCode === 40) {
			if (activeSuggestion + 1 === filteredSuggestions.length) {
				return;
			}

			this.setState({ activeSuggestion: activeSuggestion + 1 });
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="search-form">
				<input
					className="search-inp"
					type="text"
					placeholder="Dog breeds"
					name="searchText"
					value={this.state.searchText}
					onChange={this.handleChange}
					onKeyDown={this.onKeyDown}
				/>
				<SuggestionsList
					showSuggestions={this.state.showSuggestions}
					searchText={this.state.searchText}
					filteredSuggestions={this.state.filteredSuggestions}
					activeSuggestion={this.state.activeSuggestion}
					hClick={this.onClick}
				/>
			</form>
		);
	}
}

export default Search;
