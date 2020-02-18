import React, { Component } from "react";
import { isAuthenticated } from "../Auth";
import { create } from "./ApiPost";
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

class NewPost extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			body: "",
			photo: "",
			error: "",
			user: {},
			fileSize: 0,
			loading: false,
			redirectToProfile: false,
			teams: [],
			validationError: "",
			category: ""
		};
	}

	useStyles = makeStyles(theme => ({
		root: {
			"& > *": {
				margin: theme.spacing(1)
			}
		}
	}));

	componentDidMount() {
		fetch(`${process.env.REACT_APP_API_URL}/categories`)
			.then(response => {
				return response.json();
			})
			.then(data => {
				let teamsFromApi = data.map(team => {
					return team;
				});

				this.setState({
					teams: teamsFromApi
				});
			})
			.catch(error => {
				console.log(error);
			});

		this.postData = new FormData();

		this.setState({ user: isAuthenticated().user });
	}

	isValid = () => {
		const { title, body, fileSize } = this.state;
		if (fileSize > 100000) {
			this.setState({
				error: "File size should be less than 100kb",
				loading: false
			});
			return false;
		}
		if (title.length === 0 || body.length === 0) {
			this.setState({ error: "All fields are required", loading: false });
			return false;
		}
		return true;
	};

	handleChange = name => event => {
		this.setState({ error: "" });
		console.log(`${name} == ${event.target.value}`);

		// const category = this.state.teams.find(u => u.name === event.target.value);

		// const value =
		// 	name === "category" ? JSON.stringify(category) : event.target.value;
		const value = name === "photo" ? event.target.files[0] : event.target.value;

		const fileSize = name === "photo" ? event.target.files[0].size : 0;
		// this.postData.set(name, value);
		// this.postData.append("photo", Photovalue);

		this.postData.set(name, value);
		this.setState({ [name]: value, fileSize });
	};

	clickSubmit = event => {
		event.preventDefault();
		this.setState({ loading: true });
		if (this.isValid()) {
			const userId = isAuthenticated().user._id;
			const token = isAuthenticated().token;
			console.log(this.postData);
			create(userId, token, this.postData).then(data => {
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
		}
	};

	newPostForm = (title, category, body, teams, error) => (
		<React.Fragment>
			<Grid container style={{ justifyContent: "center" }}>
				<Typography
					variant="h6"
					gutterBottom
					color="secondary"
					style={{ marginTop: 30 }}
				>
					WRITE YOUR AWESOME BLOG
				</Typography>

				<Grid item xs={12} sm={10}>
					<div style={{ display: error ? "" : "none" }}>
						<InputLabel style={{ color: "red" }}>{this.state.error}</InputLabel>
					</div>
					<TextField
						required
						id="blogTitle"
						value={title}
						label="Blog Title"
						fullWidth
						autoComplete="blog"
						onChange={this.handleChange("title")}
						style={{ textTransform: "uppercase" }}
					/>

					<FormControl
						required
						style={{ width: 350, marginTop: 30, marginBottom: 30 }}
					>
						<InputLabel id="categories" style={{ textTransform: "uppercase" }}>
							Blog Category
						</InputLabel>

						<Select
							labelId="categories"
							id="categories"
							label="Blog Catetory"
							value={category}
							onChange={this.handleChange("category")}
							style={{ width: "200px" }}
						>
							{teams.map(cat => (
								<MenuItem key={cat._id} value={cat._id}>
									{cat.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<InputLabel id="photo" style={{ textTransform: "uppercase" }}>
						Blog Image
					</InputLabel>
					<Input
						type="file"
						id="photo"
						onChange={this.handleChange("photo")}
						type="file"
						accept="image/*"
						style={{ width: 350, marginBottom: 30 }}
					/>

					<TextField
						required
						id="body"
						value={body}
						label="Blog Content"
						fullWidth
						autoComplete="Write"
						multiline={true}
						rows={10}
						rowsMax={20}
						onChange={this.handleChange("body")}
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

		// <form>
		// 	<div className="form-group">
		// 		<label className="text-muted">Post Photo</label>
		// 		<input
		// 			onChange={this.handleChange("photo")}
		// 			type="file"
		// 			accept="image/*"
		// 			className="form-control"
		// 		/>
		// 	</div>
		// 	<div className="form-group">
		// 		<label className="text-muted">Title</label>
		// 		<input
		// 			onChange={this.handleChange("title")}
		// 			type="text"
		// 			className="form-control"
		// 			value={title}
		// 		/>
		// 	</div>

		// 	<div className="form-group">
		// 		<label className="text-muted">Body</label>
		// 		<textarea
		// 			onChange={this.handleChange("body")}
		// 			type="text"
		// 			className="form-control"
		// 			value={body}
		// 		/>
		// 	</div>

		// 	<button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
		// 		Create Post
		// 	</button>
		// </form>
	);

	render() {
		const {
			title,
			body,
			category,
			photo,
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

		// let planets = teams;
		// let optionItems = planets.map(planet => (
		// 	<option key={planet._id}>{planet.name}</option>
		// ));

		return (
			<div>
				{loading ? (
					<div className="jumbotron text-center">
						<h2>Loading...</h2>
					</div>
				) : (
					""
				)}

				{/* <select onChange={this.handleChange("category")}>{optionItems}</select> */}

				{this.newPostForm(title, category, body, teams, error)}
			</div>
		);
	}
}

export default NewPost;
