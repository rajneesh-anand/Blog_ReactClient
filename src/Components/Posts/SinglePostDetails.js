import React, { Component } from "react";
import { singlePost, remove, like, unlike } from "./ApiPost";
import DefaultPost from "../Images/mountains.jpg";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../Auth";
import Comment from "./Comment";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";

class SinglePostDetails extends Component {
	constructor() {
		super();
		this.state = {
			post: "",
			redirectToHome: false,
			redirectToSignin: false,
			like: false,
			likes: 0,
			comments: []
		};
	}

	checkLike = likes => {
		const userId = isAuthenticated() && isAuthenticated().user._id;
		let match = likes.indexOf(userId) !== -1;
		return match;
	};

	componentDidMount = () => {
		const postId = this.props.postId;
		singlePost(postId).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({
					post: data,
					likes: data.likes.length,
					like: this.checkLike(data.likes),
					comments: data.comments
				});
			}
		});
	};

	updateComments = comments => {
		this.setState({ comments });
	};

	likeToggle = () => {
		if (!isAuthenticated()) {
			this.setState({ redirectToSignin: true });
			return false;
		}
		let callApi = this.state.like ? unlike : like;
		const userId = isAuthenticated().user._id;
		const postId = this.state.post._id;
		const token = isAuthenticated().token;

		callApi(userId, token, postId).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({
					like: !this.state.like,
					likes: data.likes.length
				});
			}
		});
	};

	deletePost = () => {
		const postId = this.props.match.params.postId;
		const token = isAuthenticated().token;
		remove(postId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({ redirectToHome: true });
			}
		});
	};

	deleteConfirmed = () => {
		let answer = window.confirm("Are you sure you want to delete your post?");
		if (answer) {
			this.deletePost();
		}
	};

	formatDate = string => {
		let options = { year: "numeric", month: "short", day: "numeric" };
		return new Date(string).toLocaleDateString([], options);
	};

	renderPost = post => {
		const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
		const posterName = post.postedBy ? post.postedBy.name : " Unknown";
		const photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}`;

		const { like, likes } = this.state;

		return (
			<Grid item xs={12} sm={10} style={{ paddingRight: "8px" }} align="center">
				<Card className={"MuiPostCard--01"}>
					<CardMedia
						className={"MuiCardMedia-root"}
						image={
							"https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80"
						}
					>
						<div className={"MuiTag--ribbon"}>
							<Typography color={"inherit"} className={"MuiTypography-root"}>
								{post.category.name}
							</Typography>
						</div>
						<Avatar className={"MuiAvatar-root"} src={photoUrl} />
					</CardMedia>
					<CardContent className={"MuiCardContent-root"}>
						<Typography
							className={"MuiTypography--heading"}
							variant={"h6"}
							gutterBottom
						>
							{post.title}
						</Typography>
						<Typography
							className={"MuiTypography--subheading"}
							variant={"caption"}
						>
							{post.body}
						</Typography>
					</CardContent>
					<CardActions className={"MuiCardActions-root"}>
						<Typography variant={"caption"}>
							{/* <Link block href={"javascript:;"} underline={"none"}> */}
							posted by <Link to={`${posterId}`}>{posterName} </Link>
							on {this.formatDate(post.created)}
							{/* </Link> */}
						</Typography>
						<div>
							<IconButton>
								<Icon>share</Icon>
							</IconButton>
							<IconButton onClick={this.likeToggle}>
								<h3>{likes}</h3>
								{like ? (
									<Icon style={{ color: "#4d94ff" }}>favorite_rounded</Icon>
								) : (
									<Icon>favorite_rounded</Icon>
								)}

								{/* <Icon>favorite_border_rounded</Icon> */}
							</IconButton>
						</div>
					</CardActions>
				</Card>
			</Grid>
		);
	};

	render() {
		const { post, redirectToHome, redirectToSignin, comments } = this.state;

		if (redirectToHome) {
			return <Redirect to={`/`} />;
		} else if (redirectToSignin) {
			return <Redirect to={`/signin`} />;
		}

		return (
			<React.Fragment>
				{/* <h2 className="display-2 mt-5 mb-5">{post.title}</h2> */}

				{!post ? (
					<div>
						<h2>Loading...</h2>
					</div>
				) : (
					this.renderPost(post)
				)}
				<Grid
					item
					xs={12}
					sm={8}
					style={{ paddingRight: "8px" }}
					align="center"
				>
					<Comment
						postId={post._id}
						comments={comments.reverse()}
						updateComments={this.updateComments}
					/>
				</Grid>
			</React.Fragment>
		);
	}
}

SinglePostDetails.getTheme = muiBaseTheme => ({
	MuiCard: {
		root: {
			"&.MuiPostCard--01": {
				transition: "0.3s",
				maxWidth: "100%",
				margin: "auto",
				boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
				"&:hover": {
					transform: "translateY(-3px)",
					boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
				},
				"& .MuiCardMedia-root": {
					paddingTop: "30.25%",
					position: "relative",
					"& .MuiTag--ribbon": {
						position: "absolute",
						top: muiBaseTheme.spacing(2),
						left: muiBaseTheme.spacing(2),
						backgroundColor: muiBaseTheme.palette.secondary.main,
						color: "#ffffff !important",
						padding: "2px 8px",
						boxShadow: "0 2px 12px 2px rgba(0,0,0,0.5)",
						borderTopLeftRadius: 2,
						borderBottomLeftRadius: 2,
						"&:before, &:after": {
							position: "absolute",
							right: -16,
							content: '" "',
							borderLeft: `16px solid ${muiBaseTheme.palette.secondary.main}`
						},
						"&:before": {
							top: 0,
							borderBottom: "12px solid transparent"
						},
						"&:after": {
							bottom: 0,
							borderTop: "12px solid transparent"
						},
						"& .MuiTypography-root": {
							fontWeight: "bold"
						}
					},
					"& .MuiAvatar-root": {
						position: "absolute",
						right: "12%",
						bottom: 0,
						transform: "translateY(20%)",
						width: 48,
						height: 48,
						zIndex: 1
					},
					"&:after": {
						content: '" "',
						position: "absolute",
						left: 0,
						bottom: 0,
						width: "100%",
						borderBottom: "32px solid #ffffff",
						borderLeft: "400px solid transparent"
					}
				},
				"& .MuiCardContent-root": {
					textAlign: "left",
					padding: muiBaseTheme.spacing(3)
				},
				"& .MuiTypography--heading": {
					fontWeight: "bold"
				},
				"& .MuiTypography--subheading": {
					lineHeight: 1.8
				},
				"& .MuiCardActions-root": {
					padding: `0 ${muiBaseTheme.spacing(3)}px ${muiBaseTheme.spacing(
						3
					)}px`,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center"
				}
			}
		}
	}
});
SinglePostDetails.displayName = "Card";
SinglePostDetails.metadata = {
	name: "Post Card",
	description: "Personal Post"
};

export default SinglePostDetails;
