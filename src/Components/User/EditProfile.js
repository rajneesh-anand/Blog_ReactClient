import React, { Component, Fragment } from "react";
import { isAuthenticated } from "../Auth";
import { read, update, updateUser } from "./apiUser";
import { Redirect } from "react-router-dom";
import DefaultProfile from "../Images/avatar.jpg";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import { findByLabelText } from "@testing-library/react";

const styles = theme => ({
	root: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
		border: 0,
		borderRadius: 3,
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		color: "white",
		height: 48,
		padding: "0 30px",

		margin: theme.spacing(1)
	},
	large: {
		width: theme.spacing(10),
		height: theme.spacing(10)
	},
	elm: {
		padding: "8px",
		fontFamily: [
			"Nunito",
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif"
		].join(",")
	}
});

class EditProfile extends Component {
	constructor() {
		super();
		this.state = {
			id: "",
			name: "",
			email: "",
			password: "",
			redirectToProfile: false,
			error: "",
			fileSize: 0,
			loading: false,
			about: ""
		};
	}

	init = userId => {
		const token = isAuthenticated().token;
		read(userId, token).then(data => {
			if (data.error) {
				this.setState({ redirectToProfile: true });
			} else {
				this.setState({
					id: data._id,
					name: data.name,
					email: data.email,
					error: "",
					about: data.about
				});
			}
		});
	};

	componentDidMount() {
		this.userData = new FormData();
		const userId = this.props.match.params.userId;
		this.init(userId);
	}

	isValid = () => {
		const { name, email, password, fileSize } = this.state;
		if (fileSize > 1000000) {
			this.setState({
				error: "File size should be less than 100kb",
				loading: false
			});
			return false;
		}
		if (name.length === 0) {
			this.setState({ error: "Name is required", loading: false });
			return false;
		}
		// email@domain.com
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			this.setState({
				error: "A valid Email is required",
				loading: false
			});
			return false;
		}
		if (password.length >= 1 && password.length <= 5) {
			this.setState({
				error: "Password must be at least 6 characters long",
				loading: false
			});
			return false;
		}
		return true;
	};

	handleChange = name => event => {
		this.setState({ error: "" });
		const value = name === "photo" ? event.target.files[0] : event.target.value;

		const fileSize = name === "photo" ? event.target.files[0].size : 0;
		this.userData.set(name, value);
		this.setState({ [name]: value, fileSize });
	};

	clickSubmit = event => {
		event.preventDefault();
		this.setState({ loading: true });

		if (this.isValid()) {
			const userId = this.props.match.params.userId;
			const token = isAuthenticated().token;

			update(userId, token, this.userData).then(data => {
				if (data.error) {
					this.setState({ error: data.error });
				} else if (isAuthenticated().user.role === "admin") {
					this.setState({
						redirectToProfile: true
					});
				} else {
					updateUser(data, () => {
						this.setState({
							redirectToProfile: true
						});
					});
				}
			});
		}
	};

	signupForm = (name, email, password, about, classes, photoUrl) => (
		<Fragment>
			<Grid item xs={12} md={6} align="center">
				<Avatar alt={name} src={photoUrl} className={classes.large} />
				<Input
					type="file"
					id="photo"
					onChange={this.handleChange("photo")}
					type="file"
					accept="image/*"
					disableUnderline
				/>
				<div className={classes.elm} display="flex">
					<label style={{ paddingRight: "10px", color: "#668cff" }}>Name</label>
					<Input
						onChange={this.handleChange("name")}
						type="text"
						value={name}
						disableUnderline
					/>
				</div>
				<div className={classes.elm} display="flex">
					<label style={{ paddingRight: "10px", color: "#668cff" }}>
						Email
					</label>
					<Input
						onChange={this.handleChange("email")}
						type="email"
						value={email}
						disableUnderline
					/>
				</div>
				<div className={classes.elm} display="flex">
					<label style={{ paddingRight: "10px", color: "#668cff" }}>
						About
					</label>
					<Input
						onChange={this.handleChange("about")}
						type="text"
						value={about}
						multiline
						disableUnderline
					/>
				</div>
				<div className={classes.elm}>
					<label style={{ paddingRight: "10px", color: "#668cff" }}>
						Password
					</label>
					<Input
						onChange={this.handleChange("password")}
						type="password"
						value={password}
						disableUnderline
					/>
				</div>
				<button onClick={this.clickSubmit}>Update</button>
			</Grid>
		</Fragment>
	);

	render() {
		const {
			id,
			name,
			email,
			password,
			redirectToProfile,
			error,
			loading,
			about
		} = this.state;

		const { classes } = this.props;

		if (redirectToProfile) {
			return <Redirect to={`/user/${id}`} />;
		}

		const photoUrl = id
			? `${
					process.env.REACT_APP_API_URL
			  }/user/photo/${id}?${new Date().getTime()}`
			: DefaultProfile;

		return (
			<Grid container justify="center" style={{ marginTop: "16px" }}>
				<div
					className="alert alert-danger"
					style={{ display: error ? "" : "none" }}
				>
					{error}
				</div>

				{loading ? (
					<div className="jumbotron text-center">
						<h2>Loading...</h2>
					</div>
				) : (
					""
				)}

				{/* <img
					style={{ height: "200px", width: "auto" }}
					className="img-thumbnail"
					src={photoUrl}
					onError={i => (i.target.src = `${DefaultProfile}`)}
					alt={name}
				/> */}

				{isAuthenticated().user.role === "admin" &&
					this.signupForm(name, email, password, about, classes, photoUrl)}

				{isAuthenticated().user._id === id &&
					this.signupForm(name, email, password, about, classes, photoUrl)}
			</Grid>
		);
	}
}

export default withStyles(styles)(EditProfile);
