import React, { Component } from "react";
import { list } from "./ApiPost";
// import DefaultPost from "../Images/mountains.jpg";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FeaturedPost from "./FeaturedPost";

class Posts extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			page: 1
		};
	}

	loadPosts = page => {
		list(page).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({ posts: data });
				console.log(data);
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

	renderPosts = posts => {
		return (
			<React.Fragment>
				<CssBaseline />

				<Grid container spacing={4}>
					{posts.map(post => (
						<FeaturedPost key={post._id} post={post} />
					))}
				</Grid>
			</React.Fragment>
		);
	};

	render() {
		const { posts, page } = this.state;
		return (
			<Container maxWidth="lg">
				<main>
					<h5>{!posts.length ? "No more posts!" : "Recent Posts"} </h5>

					{this.renderPosts(posts)}

					{page > 1 ? (
						<button onClick={() => this.loadLess(1)}>Previous</button>
					) : (
						""
					)}

					{posts.length > 25 ? (
						<button onClick={() => this.loadMore(1)}>
							{/* Next ({page + 1}) */}
							Next
						</button>
					) : (
						""
					)}
				</main>
			</Container>
		);
	}
}

export default Posts;
