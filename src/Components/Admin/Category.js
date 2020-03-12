import React, { Component } from "react";
import { isAuthenticated } from "../Auth";
import { create } from "./apiCategory";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { categoryList } from "./apiCategory";

class Category extends Component {
	_isMounted = false;
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
		this._isMounted = true;
		categoryList().then(data => {
			if (this._isMounted) {
				this.setState({ categories: data });
			}
		});
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const { categories } = this.state;

		if (categories !== null && categories.length === 0) {
			return <h4>Add Category</h4>;
		}

		return (
			<div>
				<h4>Category List</h4>
				{categories !== null ? (
					<ul>
						{categories.map(contact => (
							<li key={contact._id}>{contact.name}</li>
						))}
					</ul>
				) : (
					<h4>Category null value</h4>
				)}
			</div>
		);
	}
}

export default Category;
