import React, { Component } from "react";
import { isAuthenticated } from "./Auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DefaultProfile from "./images/avatar.jpg";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import { listByUser } from "./apiPost";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: { following: [], followers: [] },
			redirectToSignin: false,
			following: false,
			error: "",
			posts: []
		};
	}

	useStyles = makeStyles(theme => ({
		root: {
			flexGrow: 1
		},
		paper: {
			padding: theme.spacing(2),
			alignItems: "center",
			color: theme.palette.text.secondary
		}
	}));

	// check follow
	checkFollow = user => {
		const jwt = isAuthenticated();
		const match = user.followers.find(follower => {
			// one id has many other ids (followers) and vice versa
			return follower._id === jwt.user._id;
		});
		return match;
	};

	clickFollowButton = callApi => {
		const userId = isAuthenticated().user._id;
		const token = isAuthenticated().token;

		callApi(userId, token, this.state.user._id).then(data => {
			if (data.error) {
				this.setState({ error: data.error });
			} else {
				this.setState({ user: data, following: !this.state.following });
			}
		});
	};

	init = userId => {
		const token = isAuthenticated().token;
		read(userId, token).then(data => {
			if (data.error) {
				this.setState({ redirectToSignin: true });
			} else {
				let following = this.checkFollow(data);
				this.setState({ user: data, following });
				this.loadPosts(data._id);
			}
		});
	};

	loadPosts = userId => {
		const token = isAuthenticated().token;
		listByUser(userId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({ posts: data });
			}
		});
	};

	componentDidMount() {
		const userId = this.props.match.params.userId;
		this.init(userId);
	}

	componentWillReceiveProps(props) {
		const userId = props.match.params.userId;
		this.init(userId);
	}

	render() {
		const { redirectToSignin, user, posts } = this.state;
		if (redirectToSignin) return <Redirect to="/signin" />;

		const photoUrl = user._id
			? `${process.env.REACT_APP_API_URL}/user/photo/${
					user._id
			  }?${new Date().getTime()}`
			: DefaultProfile;

		return (
			<div className={this.useStyles.root}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} align="center">
						<h2>My Profile</h2>
						<img
							style={{ height: "200px", width: "auto" }}
							src={photoUrl}
							onError={i => (i.target.src = `${DefaultProfile}`)}
							alt={user.name}
						/>
						<p>Hello {user.name}</p>
						<p>Email: {user.email}</p>
						<p>{`Joined ${new Date(user.created).toDateString()}`}</p>

						{isAuthenticated().user &&
						isAuthenticated().user._id === user._id ? (
							<div>
								<Button
									variant="contained"
									color="primary"
									component={Link}
									to={`/post/create`}
									style={{ margin: 5 }}
								>
									Create Post
								</Button>

								<Button
									variant="contained"
									color="primary"
									component={Link}
									to={`/user/edit/${user._id}`}
									style={{ margin: 5 }}
								>
									Edit Profile
								</Button>

								<DeleteUser userId={user._id} />
							</div>
						) : (
							<FollowProfileButton
								following={this.state.following}
								onButtonClick={this.clickFollowButton}
							/>
						)}
					</Grid>

					<Grid item xs={12} sm={6} align="center">
						{isAuthenticated().user && isAuthenticated().user.role === "admin" && (
							<div className="card mt-5">
								<div className="card-body">
									<h5 className="card-title">Admin</h5>
									<p className="mb-2 text-danger">Edit/Delete as an Admin</p>
									<Link
										className="btn btn-raised btn-success mr-5"
										to={`/user/edit/${user._id}`}
									>
										Edit Profile
									</Link>
									{/*<DeleteUser userId={user._id} />*/}
									<DeleteUser />
								</div>
							</div>
						)}
						<ProfileTabs
							followers={user.followers}
							following={user.following}
							posts={posts}
						/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Profile;
