import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DesignList from "./DesignList";
import { listByCategory } from "../Posts/ApiPost";

class Design extends Component {
	state = {
		posts: [],
		loading: false,
		page: 1,
		category: "news"
	};

	loadPosts = page => {
		listByCategory(this.state.category, page).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({ posts: data });
			}
		});
	};

	componentDidMount() {
		this.loadPosts(this.state.page);
	}

	loadMore = number => {
		this.setState({ page: this.state.page + number });
		this.loadPosts(this.state.page + number);
	};

	loadLess = number => {
		this.setState({ page: this.state.page - number });
		this.loadPosts(this.state.page - number);
	};

	render() {
		const { posts, page, loading } = this.state;
		return (
			<React.Fragment>
				<DesignList posts={posts} />

				{page > 1 ? (
					<Button onClick={() => this.loadLess(1)}>Previous</Button>
				) : (
					""
				)}

				{posts.length > 25 ? (
					<Button onClick={() => this.loadMore(1)}>Next</Button>
				) : (
					""
				)}
			</React.Fragment>
		);
	}
}

export default Design;
