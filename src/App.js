import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./Search";

class App extends Component {
	state = {
		dogArray: [],
		searchText: "",
		allBreeds: []
	};

	componentDidMount() {
		fetch("https://dog.ceo/api/breeds/image/random/12")
			.then(res => res.json())
			.then(json => {
				this.setState({ dogArray: json.message });
			})
			.then(
				fetch("https://dog.ceo/api/breeds/list/all")
					.then(res2 => res2.json())
					.then(json2 => {
						var resBreeds = json2.message;
						var breedsArray = [];

						for (var key in resBreeds) {
							breedsArray.push(key);
						}
						this.setState({ allBreeds: breedsArray });
					})
			);
	}

	outerHandler = text => {
		fetch("https://dog.ceo/api/breed/" + text + "/images/random/12")
			.then(res => res.json())
			.then(json => {
				if (json.status === "error") {
					console.log("error");
				} else if (json.status === "success") {
					this.setState({ dogArray: json.message });
				}
			});
	};

	render() {
		const dogList = this.state.dogArray.map((elem, index) => {
			return (
				<li key={index}>
					<img src={elem} alt="doggo" />{" "}
				</li>
			);
		});

		return (
			<div className="App">
				<Search
					outerHandler={this.outerHandler}
					suggestions={this.state.allBreeds}
				/>
				<ul className="dogs-list">{dogList} </ul>
			</div>
		);
	}
}

export default App;
