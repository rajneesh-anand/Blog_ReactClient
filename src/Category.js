import React, { Component } from "react";
import { isAuthenticated } from "./Auth";
import { create } from "./apiCategory";
import { Redirect } from "react-router-dom";

class Category extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			description: "",
			error: "",
			loading: false,
			open: false
		};
	}

	isValid = () => {
		const { name, description } = this.state;

		if (name.length === 0 || description.length === 0) {
			this.setState({ error: "All fields are required", loading: false });
			return false;
		}
		console.log("name :", name);
		console.log("description :", description);
		return true;
	};

	handleChange = name => event => {
		this.setState({ error: "" });
		this.setState({ open: false });

		this.setState({ [name]: event.target.value });
	};

	clickSubmit = event => {
		event.preventDefault();

		const { name, description } = this.state;
		const category = {
			name,
			description
		};

		if (this.isValid()) {
			const userId = isAuthenticated().user._id;
			const token = isAuthenticated().token;

			create(category, token).then(data => {
				if (data.error) this.setState({ error: data.error });
				else {
					this.setState({
						loading: false,
						name: "",
						description: "",
						error: "",
						open: true
					});
				}
			});
		}
	};

	newCategoryForm = (name, description) => (
		<form>
			<div className="form-group">
				<label className="text-muted">Title</label>
				<input
					onChange={this.handleChange("name")}
					type="text"
					className="form-control"
					value={name}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Body</label>
				<textarea
					onChange={this.handleChange("description")}
					type="text"
					className="form-control"
					value={description}
				/>
			</div>

			<button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
				Create Category
			</button>
		</form>
	);

	render() {
		const { name, description, error, loading, open } = this.state;

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
				<div
					className="alert alert-info"
					style={{ display: open ? "" : "none" }}
				>
					category aaded
				</div>

				{this.newCategoryForm(name, description)}
			</div>
		);
	}
}

export default Category;
