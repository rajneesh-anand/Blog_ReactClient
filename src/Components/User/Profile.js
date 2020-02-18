import React, { Component } from "react";
import { isAuthenticated } from "../Auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DefaultProfile from "../Images/avatar.jpg";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import { listByUser } from "../Posts/ApiPost";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Admin from "../Admin";
import { Typography } from "@material-ui/core";

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
			<React.Fragment>
				<Grid container style={{ marginTop: 16 }}>
					<Grid item xs={12} sm={4} align="center">
						<img
							style={{ height: "150px", borderRadius: "25px", width: "auto" }}
							src={photoUrl}
							onError={i => (i.target.src = `${DefaultProfile}`)}
							alt={user.name}
						/>
						<Typography>Hello {user.name}</Typography>
						<Typography>Email: {user.email}</Typography>
						<Typography>{`Joined ${new Date(
							user.created
						).toDateString()}`}</Typography>

						{isAuthenticated().user &&
						isAuthenticated().user._id === user._id ? (
							<div>
								<Button
									variant="contained"
									color="primary"
									component={Link}
									to={`/post/create`}
									style={{ margin: 5 }}
									size="small"
								>
									Create Post
								</Button>

								<Button
									variant="contained"
									color="primary"
									component={Link}
									to={`/user/edit/${user._id}`}
									style={{ margin: 5 }}
									size="small"
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

					<Grid item xs={12} sm={8}>
						<ProfileTabs
							followers={user.followers}
							following={user.following}
							posts={posts}
						/>
					</Grid>
				</Grid>

				<Grid container spacing={1}>
					<Grid item xs={12} sm={12}>
						{isAuthenticated().user && isAuthenticated().user.role === "admin" && (
							<div>
								<Admin />
								<h5>Admin</h5>
								<p>Edit/Delete as an Admin</p>
								<Link
									className="btn btn-raised btn-success mr-5"
									to={`/user/edit/${user._id}`}
								>
									Edit Profile
								</Link>
							</div>
						)}
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export default Profile;
