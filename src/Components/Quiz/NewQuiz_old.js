import React, { useState, useEffect, Component } from "react";
import { isAuthenticated } from "../Auth";
import { create } from "./APIQuiz";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { AuthContext } from "../../Context/Auth/AuthState";
class NewQuiz extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			bodyFirst: "",
			bodySecond: "",
			photoFirst: "",
			photoSecond: "",
			error: "",
			user: {},
			loading: false,
			redirectToProfile: false,
			validationError: "",
			status: "active"
		};
	}

	componentDidMount() {
		this.postData = new FormData();
		this.setState({ user: isAuthenticated().user });
	}

	handleChange = name => event => {
		this.setState({ error: "" });
		let value;

		if (name === "photoFirst") {
			value = event.target.files[0];
		} else if (name === "photoSecond") {
			value = event.target.files[0];
		} else {
			value = event.target.value;
		}

		// const fileSizeFirst =
		// 	name === "photoFirst" ? event.target.files[0].size : 0;
		// const fileSizeSecond =
		// 	name === "photoSecond" ? event.target.files[1].size : 0;

		this.postData.set(name, value);
		this.setState({ [name]: value });
	};

	clickSubmit = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const userId = isAuthenticated().user._id;
		const token = isAuthenticated().token;
		const formData = this.postData;
		formData.append("status", "active");
		create(userId, token, formData).then(data => {
			if (data.error) this.setState({ error: data.error });
			else {
				console.log("new posts : ", data);
				this.setState({
					loading: false,
					title: "",
					body: "",
					category: "",
					redirectToProfile: true
				});
			}
		});
	};

	newPostForm = (title, bodyFirst, bodySecond, error) => (
		<React.Fragment>
			<Grid container style={{ justifyContent: "center" }}>
				<Typography
					variant="h6"
					gutterBottom
					color="secondary"
					style={{ marginTop: 30 }}
				>
					WHAT DO YOU WANT TO COMPARE ?
				</Typography>

				<Grid item xs={12} sm={10}>
					<div style={{ display: error ? "" : "none" }}>
						<InputLabel style={{ color: "red" }}>{this.state.error}</InputLabel>
					</div>
					<TextField
						required
						id="blogTitle"
						value={title}
						label="Subject Title !"
						fullWidth
						autoComplete="blog"
						onChange={this.handleChange("title")}
						style={{ textTransform: "uppercase" }}
					/>

					<InputLabel id="photo" style={{ textTransform: "uppercase" }}>
						First Image
					</InputLabel>
					<Input
						type="file"
						name="photo"
						onChange={this.handleChange("photoFirst")}
						type="file"
						accept="image/*"
						style={{ width: 350, marginBottom: 30 }}
					/>

					<TextField
						required
						id="body"
						value={bodyFirst}
						label="Describe Subject Details"
						fullWidth
						autoComplete="Write"
						multiline={true}
						rows={4}
						rowsMax={5}
						onChange={this.handleChange("bodyFirst")}
						style={{ textTransform: "uppercase" }}
					/>
					<InputLabel id="photo" style={{ textTransform: "uppercase" }}>
						Second Image
					</InputLabel>
					<Input
						type="file"
						name="photo2"
						onChange={this.handleChange("photoSecond")}
						type="file"
						accept="image/*"
						style={{ width: 350, marginBottom: 30 }}
					/>

					<TextField
						required
						id="body2"
						value={bodySecond}
						label="Describe Subject Details"
						fullWidth
						autoComplete="Write"
						multiline={true}
						rows={4}
						rowsMax={5}
						onChange={this.handleChange("bodySecond")}
						style={{ textTransform: "uppercase" }}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={this.clickSubmit}
						style={{ marginTop: 30, marginBottom: 30 }}
					>
						Create Post
					</Button>
				</Grid>
			</Grid>
		</React.Fragment>
	);

	render() {
		const {
			title,
			bodyFirst,
			bodySecond,
			category,
			user,
			error,
			teams,
			loading,
			redirectToProfile,
			selectedOption
		} = this.state;

		if (redirectToProfile) {
			return <Redirect to={`/user/${user._id}`} />;
		}

		return (
			<div>
				{loading ? (
					<div>
						<h2>Loading...</h2>
					</div>
				) : (
					""
				)}

				{this.newPostForm(title, bodyFirst, bodySecond, error)}
			</div>
		);
	}
}

export default NewQuiz;
