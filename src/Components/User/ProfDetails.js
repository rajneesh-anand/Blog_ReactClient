import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// import EditDetails from "./EditDetails";
import MyButton from "../../utils/MyButton";
import ProfileSkeleton from "../../utils/ProfileSkeleton";
import DefaultImage from "../Images/logo.png";
import { read } from "./apiUser";
import { listByUser, remove } from "../Posts/ApiPost";
// MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import { AuthContext } from "../../Context/Auth/AuthState";
import { useEffect } from "react";

const styles = {
	palette: {
		primary: {
			light: "#33c9dc",
			main: "#00bcd4",
			dark: "#008394",
			contrastText: "#fff"
		},
		secondary: {
			light: "#ff6333",
			main: "#ff3d00",
			dark: "#b22a00",
			contrastText: "#fff"
		}
	},
	typography: {
		useNextVariants: true
	},
	form: {
		textAlign: "center"
	},
	image: {
		margin: "20px auto 20px auto"
	},
	pageTitle: {
		margin: "10px auto 10px auto"
	},
	textField: {
		margin: "10px auto 10px auto"
	},
	button: {
		marginTop: 20,
		position: "relative"
	},
	customError: {
		color: "red",
		fontSize: "0.8rem",
		marginTop: 10
	},
	progress: {
		position: "absolute"
	},
	invisibleSeparator: {
		border: "none",
		margin: 4
	},
	visibleSeparator: {
		width: "100%",
		borderBottom: "1px solid rgba(0,0,0,0.1)",
		marginBottom: 20
	},
	paper: {
		padding: 20
	},
	profile: {
		"& .image-wrapper": {
			textAlign: "center",
			position: "relative",
			"& button": {
				position: "absolute",
				top: "80%",
				left: "70%"
			}
		},
		"& .profile-image": {
			width: 200,
			height: 200,
			objectFit: "cover",
			maxWidth: "100%",
			borderRadius: "50%"
		},
		"& .profile-details": {
			textAlign: "center",
			"& span, svg": {
				verticalAlign: "middle"
			},
			"& a": {
				color: "#00bcd4"
			}
		},
		"& hr": {
			border: "none",
			margin: "0 0 10px 0"
		},
		"& svg.button": {
			"&:hover": {
				cursor: "pointer"
			}
		}
	},
	buttons: {
		textAlign: "center",
		"& a": {
			margin: "20px 10px"
		}
	}
};

// const styles = theme => ({
// 	...theme
// });

const ProfDetails = ({ classes }) => {
	const { isAuthenticated, user } = React.useContext(AuthContext);
	const [data, setData] = React.useState({
		loading: false,
		error: null,
		user: { following: [], followers: [] },
		posts: [],
		bio: "",
		location: "",
		website: "",
		createdAt: null
	});

	const checkFollow = user => {
		const match = user.followers.find(follower => {
			// one id has many other ids (followers) and vice versa
			return follower._id === user._id;
		});
		return match;
	};

	useEffect(() => {
		setData({ loading: true });
		const token = JSON.parse(localStorage.getItem("token"));
		read(user._id, token).then(data => {
			if (data.error) {
				setData({ error: true });
			} else {
				let following = checkFollow(data);
				setData({ user: data, following });
				setData({ createdAt: data.created });
				loadPosts(data._id);
			}
		});
	}, []);

	const loadPosts = userId => {
		const token = JSON.parse(localStorage.getItem("token"));
		listByUser(userId, token).then(data => {
			if (data.error) {
				setData({ error: data.error });
			} else {
				setData({ posts: data, loading: false });
			}
		});
	};

	const handleImageChange = event => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append("image", image, image.name);
		// this.props.uploadImage(formData);
	};

	const handleEditPicture = () => {
		const fileInput = document.getElementById("imageInput");
		fileInput.click();
	};

	const photoUrl = user._id
		? `${process.env.REACT_APP_API_URL}/user/photo/${
				user._id
		  }?${new Date().getTime()}`
		: DefaultImage;

	let profileMarkup = isAuthenticated ? (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={photoUrl} alt="profile" className="profile-image" />
					<input
						type="file"
						id="imageInput"
						hidden="hidden"
						onChange={handleImageChange}
					/>
					<MyButton
						tip="Edit profile picture"
						onClick={handleEditPicture}
						btnClassName="button"
					>
						<EditIcon color="primary" />
					</MyButton>
				</div>
				<hr />
				<div className="profile-details">
					{/* <MuiLink
						component={Link}
						to={`/users/${handle}`}
						color="primary"
						variant="h5"
					>
						@{handle}
					</MuiLink> */}
					<hr />
					{data.bio && <Typography variant="body2">{data.bio}</Typography>}
					<hr />
					{data.ocation && (
						<Fragment>
							<LocationOn color="primary" /> <span>{data.location}</span>
							<hr />
						</Fragment>
					)}
					{data.website && (
						<Fragment>
							<LinkIcon color="primary" />
							<a href={data.website} target="_blank" rel="noopener noreferrer">
								{" "}
								{data.website}
							</a>
							<hr />
						</Fragment>
					)}
					<CalendarToday color="primary" />{" "}
					<span>Joined {dayjs(data.createdAt).format("MMM YYYY")}</span>
				</div>

				{/* <EditDetails /> */}
			</div>
		</Paper>
	) : (
		<ProfileSkeleton />
	);

	return profileMarkup;
};

ProfDetails.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfDetails);
