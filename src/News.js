import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
	root: {
		maxWidth: 345
	},
	media: {
		height: 140
	}
});

export default function TestItem(props) {
	const classes = useStyles();

	return (
		<Grid item xs={12} md={4} align="center">
			<Card className={classes.root}>
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{props.user.name}
						</Typography>
						<CardMedia
							className={classes.media}
							image="https://source.unsplash.com/random"
							title="Contemplative Reptile"
						/>

						<Typography variant="body2" color="textSecondary" component="p">
							{props.user.description}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">
						Share
					</Button>
					<Button size="small" color="primary" href={props.url}>
						Read More
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}

// import React, { Component } from "react";
// import { listByCategory } from "./apiPost";
// import DefaultPost from "./images/mountains.jpg";
// import { Link } from "react-router-dom";

// class News extends Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			posts: [],
// 			page: 1,
// 			category: "news"
// 		};
// 	}

// 	loadPosts = page => {
// 		listByCategory(this.state.category, page).then(data => {
// 			if (data.error) {
// 				console.log(data.error);
// 			} else {
// 				console.log(data);
// 				this.setState({ posts: data });
// 			}
// 		});
// 	};

// 	componentDidMount() {
// 		this.loadPosts(this.state.page);
// 	}

// 	loadMore = number => {
// 		this.setState({ page: this.state.page + number });
// 		this.loadPosts(this.state.page + number);
// 	};

// 	loadLess = number => {
// 		this.setState({ page: this.state.page - number });
// 		this.loadPosts(this.state.page - number);
// 	};

// 	renderPosts = posts => {
// 		return (
// 			<div className="row">
// 				{posts.map((post, i) => {
// 					const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
// 					const posterName = post.postedBy ? post.postedBy.name : " Unknown";

// 					return (
// 						<div className="card col-md-4" key={i}>
// 							<div className="card-body">
// 								<img
// 									src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
// 									alt={post.title}
// 									onError={i => (i.target.src = `${DefaultPost}`)}
// 									className="img-thunbnail mb-3"
// 									style={{ height: "200px", width: "100%" }}
// 								/>
// 								<h5 className="card-title">{post.title}</h5>
// 								<p className="card-text">{post.body.substring(0, 100)}</p>
// 								<br />
// 								<p className="font-italic mark">
// 									Posted by <Link to={`${posterId}`}>{posterName} </Link>
// 									on {new Date(post.created).toDateString()}
// 								</p>
// 								<Link
// 									to={`/post/${post._id}`}
// 									className="btn btn-raised btn-primary btn-sm"
// 								>
// 									Read more
// 								</Link>
// 							</div>
// 						</div>
// 					);
// 				})}
// 			</div>
// 		);
// 	};

// 	render() {
// 		const { posts, page } = this.state;
// 		return (
// 			<div className="container">
// 				<h2 className="mt-5 mb-5">
// 					{!posts.length ? "No more posts!" : "Recent Posts"}
// 				</h2>

// 				{this.renderPosts(posts)}

// 				{page > 1 ? (
// 					<button
// 						className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
// 						onClick={() => this.loadLess(1)}
// 					>
// 						Previous ({this.state.page - 1})
// 					</button>
// 				) : (
// 					""
// 				)}

// 				{posts.length ? (
// 					<button
// 						className="btn btn-raised btn-success mt-5 mb-5"
// 						onClick={() => this.loadMore(1)}
// 					>
// 						Next ({page + 1})
// 					</button>
// 				) : (
// 					""
// 				)}
// 			</div>
// 		);
// 	}
// }

// export default News;
