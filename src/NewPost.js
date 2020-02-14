import React, { Component } from "react";
import { isAuthenticated } from "./Auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";
// import Select from "react-select";
// import GetCategory from "../category/GetCategory";

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
			category: {}
		};
	}

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

		const category = this.state.teams.find(u => u.name === event.target.value);

		const value =
			name === "category" ? JSON.stringify(category) : event.target.value;
		const Photovalue =
			name === "photo" ? event.target.files[0] : event.target.value;

		const fileSize = name === "photo" ? event.target.files[0].size : 0;
		this.postData.set(name, value);
		this.postData.append("photo", Photovalue);

		this.setState({ [name]: value, fileSize });
	};

	clickSubmit = event => {
		event.preventDefault();
		this.setState({ loading: true });
		if (this.isValid()) {
			const userId = isAuthenticated().user._id;
			const token = isAuthenticated().token;

			create(userId, token, this.postData).then(data => {
				if (data.error) this.setState({ error: data.error });
				else {
					console.log("new posts : ", data);
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

	newPostForm = (title, body) => (
		<form>
			<div className="form-group">
				<label className="text-muted">Post Photo</label>
				<input
					onChange={this.handleChange("photo")}
					type="file"
					accept="image/*"
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Title</label>
				<input
					onChange={this.handleChange("title")}
					type="text"
					className="form-control"
					value={title}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Body</label>
				<textarea
					onChange={this.handleChange("body")}
					type="text"
					className="form-control"
					value={body}
				/>
			</div>

			<button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
				Create Post
			</button>
		</form>
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

		let planets = teams;
		let optionItems = planets.map(planet => (
			<option key={planet._id}>{planet.name}</option>
		));

		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Create a new post</h2>
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
				{/* <div>
                <GetCategory state={this.state}/>
                </div> */}
				{/* <div className="form-group">
					<label className="text-muted">Select Blog Category</label>
					<select
						className="form-control dropdown"
						onChange={this.handleChange("category")}
					>
						{optionItems}
					</select>
				</div> */}

				{this.newPostForm(title, body)}
			</div>
		);
	}
}

export default NewPost;
