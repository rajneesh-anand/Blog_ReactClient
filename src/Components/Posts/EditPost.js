import React, { Component } from "react";
import { singlePost, update } from "./ApiPost";
import { isAuthenticated } from "../Auth";
import { Redirect } from "react-router-dom";
import DefaultPost from "../Images/mountains.jpg";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CardMedia from "@material-ui/core/CardMedia";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

class EditPost extends Component {
	constructor() {
		super();
		this.state = {
			id: "",
			title: "",
			body: "",
			category: "",
			redirectToProfile: false,
			error: "",
			fileSize: 0,
			loading: false,
			categories: []
		};
	}

	init = postId => {
		singlePost(postId).then(data => {
			if (data.error) {
				this.setState({ redirectToProfile: true });
			} else {
				console.log(data.category._id);
				this.setState({
					id: data.postedBy._id,
					title: data.title,
					body: data.body,
					category: data.category._id,
					error: ""
				});
			}
		});
	};

	componentDidMount() {
		fetch(`${process.env.REACT_APP_API_URL}/categories`)
			.then(response => {
				return response.json();
			})
			.then(data => {
				let categoriesFromApi = data.map(cat => {
					return cat;
				});

				this.setState({
					categories: categoriesFromApi
				});
			})
			.catch(error => {
				console.log(error);
			});
		this.postData = new FormData();
		const postId = this.props.match.params.postId;

		this.init(postId);
	}

	isValid = () => {
		const { title, body, fileSize } = this.state;
		if (fileSize > 1000000) {
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
		const value = name === "photo" ? event.target.files[0] : event.target.value;

		const fileSize = name === "photo" ? event.target.files[0].size : 0;
		this.postData.set(name, value);
		this.setState({ [name]: value, fileSize });
	};

	clickSubmit = event => {
		event.preventDefault();
		this.setState({ loading: true });

		if (this.isValid()) {
			const postId = this.props.match.params.postId;
			const token = isAuthenticated().token;

			update(postId, token, this.postData).then(data => {
				if (data.error) this.setState({ error: data.error });
				else {
					this.setState({
						loading: false,
						title: "",
						body: "",
						redirectToProfile: true
					});
				}
			});
		}
	};

	editPostForm = (title, body, category, categories, postId, error) => (
		<Grid container style={{ justifyContent: "center" }}>
			<Grid item xs={12} sm={10}>
				<Typography
					variant="h6"
					gutterBottom
					color="secondary"
					style={{ marginTop: 30 }}
				>
					{title}
				</Typography>
				<div style={{ display: error ? "" : "none" }}>
					<InputLabel style={{ color: "red" }}>{this.state.error}</InputLabel>
				</div>
				<CardMedia
					component="img"
					alt={title}
					height="320"
					image={`${process.env.REACT_APP_API_URL}/post/photo/${postId}`}
					onError={i => (i.target.image = `${DefaultPost}`)}
				/>
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
					>
						{categories.map(cat => (
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
					Update Post
				</Button>
			</Grid>
		</Grid>
	);

	render() {
		const {
			id,
			title,
			body,
			redirectToProfile,
			error,
			loading,
			category,
			categories
		} = this.state;

		const postId = this.props.match.params.postId;

		if (redirectToProfile) {
			return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
		}

		return (
			<div>
				{/* <h2 className="mt-5 mb-5">{title}</h2>

				<div
					className="alert alert-danger"
					style={{ display: error ? "" : "none" }}
				>
					{error}
				</div> */}

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
					src={`${process.env.REACT_APP_API_URL}/post/photo/${id}`}
					onError={i => (i.target.src = `${DefaultPost}`)}
					alt={title}
				/> */}

				{/* {isAuthenticated().user.role === "admin" &&
					this.editPostForm(title, body, category, categories, postId, error)} */}

				{isAuthenticated().user._id === id &&
					this.editPostForm(title, body, category, categories, postId, error)}
			</div>
		);
	}
}

export default EditPost;
