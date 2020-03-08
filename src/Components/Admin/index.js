import React, { Component } from "react";

import CategoryList from "./CategoryList";

import Users from "./Users";
import { isAuthenticated } from "../Auth";
import { Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import CategoryState from "../../Context/Category/categoryState";
import AddCategoryForm from "./AddCategoryForm";

class Admin extends Component {
	constructor() {
		super();
		this.state = {
			redirectToHome: false,
			categories: []
		};
	}

	componentDidMount() {
		if (isAuthenticated().user.role !== "admin") {
			this.setState({ redirectToHome: true });
		}
	}

	render() {
		if (this.state.redirectToHome) {
			return <Redirect to="/" />;
		}

		return (
			<CategoryState>
				<Grid container sm={6} xs={12}>
					<Users />
				</Grid>
				<Grid
					container
					sm={6}
					xs={12}
					justify="space-between"
					style={{ padding: "0px 32px" }}
				>
					<CategoryList />
					<AddCategoryForm />
				</Grid>
			</CategoryState>
		);
	}
}

export default Admin;
