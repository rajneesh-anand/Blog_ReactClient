import React, { Component } from "react";
import { isAuthenticated } from "../Auth";
import { create } from "./apiCategory";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { categoryList } from "./apiCategory";

class Category extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			description: "",
			error: "",
			loading: false,
			open: false,
			categories: []
		};
	}

	componentDidMount() {
		categoryList().then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({ categories: data });
			}
		});
	}

	isValid = () => {
		const { name, description } = this.state;

		if (name.length === 0 || description.length === 0) {
			this.setState({ error: "All fields are required", loading: false });
			return false;
		}

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
			<div>
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

			<button onClick={this.clickSubmit}>Create Category</button>
		</form>
	);

	render() {
		const { name, description, error, categories, open } = this.state;

		return (
			<>
				<Grid item xs={12} sm={6}>
					<div style={{ display: error ? "" : "none" }}>{error}</div>
					<div style={{ display: open ? "" : "none" }}>
						<Typography>Category Added</Typography>
					</div>
					<div>{this.newCategoryForm(name, description)}</div>
				</Grid>

				<Grid item xs={12} sm={6}>
					{categories.map(element => (
						<div key={element._id}>
							<h5>{element.name}</h5>
						</div>
					))}
				</Grid>
			</>
		);
	}
}

export default Category;
