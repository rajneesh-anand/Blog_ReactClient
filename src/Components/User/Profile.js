import React, { Component, Fragment } from "react";
import { isAuthenticated } from "../Auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DefaultProfile from "../Images/avatar.jpg";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import { listByUser, remove } from "../Posts/ApiPost";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Admin from "../Admin";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

class Profile extends Component {
	_isMounted = false;
	constructor() {
		super();
		this.state = {
			user: { following: [], followers: [] },
			redirectToSignin: false,
			following: false,
			error: "",
			posts: [],
			loading: false
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
				this.setState({ posts: data, loading: false });
			}
		});
	};

	componentDidMount() {
		this._isMounted = true;
		this.setState({ loading: true });

		const userId = this.props.match.params.userId;
		if (this._isMounted) {
			this.init(userId);
		}
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	componentWillReceiveProps(props) {
		const userId = props.match.params.userId;
		this.init(userId);
	}

	deletePost = item => {
		const postId = item._id;
		console.log(postId);
		const token = isAuthenticated().token;
		remove(postId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				// this.setState({ redirectToHome: true });
				this.loadPosts(item.postedBy._id);
			}
		});
	};

	deleteConfirmed(item) {
		let answer = window.confirm("Are you sure you want to delete your post?");
		if (answer) {
			this.deletePost(item);
		}
	}

	slugify = v => {
		if (typeof v === "string") {
			const a =
				"àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
			const b =
				"aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
			const p = new RegExp(a.split("").join("|"), "g");

			return v
				.toString()
				.toLowerCase()
				.replace(/\s+/g, "-") // Replace spaces with -
				.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
				.replace(/&/g, "-and-") // Replace & with 'and'
				.replace(/[^\w\-]+/g, "") // Remove all non-word characters
				.replace(/\-\-+/g, "-") // Replace multiple - with single -
				.replace(/^-+/, "") // Trim - from start of text
				.replace(/-+$/, ""); // Trim - from end of text
		}
		return "";
	};

	render() {
		const { redirectToSignin, user, posts, loading } = this.state;
		if (redirectToSignin) return <Redirect to="/signin" />;

		const photoUrl = user._id
			? `${process.env.REACT_APP_API_URL}/user/photo/${
					user._id
			  }?${new Date().getTime()}`
			: DefaultProfile;

		const listItem = posts.map(item => {
			const postTitle = this.slugify(item.title);
			return (
				<ListItem key={item._id}>
					<ListItemText>
						<Link to={`/post/${item._id}/${postTitle}`}>{item.title}</Link>
					</ListItemText>
					<Button onClick={this.deleteConfirmed.bind(this, item)}>
						<DeleteIcon />
					</Button>
					<Button component={Link} to={`/post/edit/${item._id}`}>
						<EditIcon />
					</Button>
					{/* <Link to={`/post/edit/${item._id}`}>Update Post</Link> */}
				</ListItem>
			);
		});

		const listNonLogin = posts.map(item => {
			const postTitle = this.slugify(item.title);
			return (
				<ListItem key={item._id}>
					<ListItemText>
						<Link to={`/post/${item._id}/${postTitle}`}>{item.title}</Link>
					</ListItemText>
				</ListItem>
			);
		});

		return (
			<React.Fragment>
				{loading ? (
					<div>
						<h2>Loading...</h2>
					</div>
				) : (
					<div>
						<Grid container style={{ marginTop: 16 }}>
							<Grid item xs={12} sm={4} align="center">
								<img
									style={{
										height: "150px",
										borderRadius: "25px",
										width: "auto"
									}}
									src={photoUrl}
									onError={i => (i.target.src = `${DefaultProfile}`)}
									alt={user.name}
								/>
								<Typography>{user.name}</Typography>
								<Typography>Email: {user.email}</Typography>
								<Typography>{`Joined ${new Date(
									user.created
								).toDateString()}`}</Typography>

								{isAuthenticated().user &&
								isAuthenticated().user._id === user._id ? (
									<Fragment>
										<div>
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
										<div>
											<Typography>
												{user.followers.length} Followers
												<span style={{ paddingLeft: "15px" }}>
													{user.following.length} Following
												</span>
											</Typography>
										</div>
									</Fragment>
								) : (
									<FollowProfileButton
										following={this.state.following}
										onButtonClick={this.clickFollowButton}
									/>
								)}
							</Grid>

							<Grid item xs={12} sm={8}>
								{isAuthenticated().user &&
								isAuthenticated().user._id === user._id ? (
									posts.length === 0 ? (
										<div>
											<Typography>Hello {user.name}</Typography>
											<Typography>
												You don't have any blogs.
												<Link to={`/post/create`}>Write your first blog.</Link>
											</Typography>
										</div>
									) : (
										<List>{listItem}</List>
									)
								) : isAuthenticated().user.role === "admin" ? (
									<List>{listItem}</List>
								) : (
									<List>{listNonLogin}</List>
								)}
							</Grid>
						</Grid>
						<Divider style={{ marginTop: "50px" }} />
						<Grid container style={{ marginTop: 16 }}>
							{isAuthenticated().user &&
								isAuthenticated().user.role === "admin" && <Admin />}
						</Grid>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default Profile;
