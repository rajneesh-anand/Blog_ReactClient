import React, { Component } from "react";
import { quizByStatus } from "./APITravel";
import TravelList from "./TravelList";

export class Travel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			loading: false,
			page: 1,
			status: "active"
		};
	}
	componentDidMount() {
		this.loadPosts(this.state.page);
	}
	loadPosts = page => {
		quizByStatus(this.state.status, page).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({ posts: data });
			}
		});
	};

	render() {
		return (
			<React.Fragment>
				<TravelList posts={this.state.posts} />
			</React.Fragment>
		);
	}
}

export default Travel;
