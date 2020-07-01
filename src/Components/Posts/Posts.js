import React, { Component } from "react";
import { list } from "./ApiPost";
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
				// console.log(data);
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
		return posts.map(post => <FeaturedPost key={post._id} post={post} />);
	};

	render() {
		const { posts, page } = this.state;
		return (
			<>
				<main>
					{/* <Typography>
						{!posts.length ? "No more posts!" : "Recent Posts"}
					</Typography> */}

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
			</>
		);
	}
}

export default Posts;
