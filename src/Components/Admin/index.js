import React, { Component, Fragment } from "react";
import Posts from "../Posts/Posts";
import Category from "./Category";
import Users from "./Users";
import { isAuthenticated } from "../Auth";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";

class Admin extends Component {
	state = {
		redirectToHome: false
	};

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
			<Fragment>
				<Grid container justify="space-between">
					<Users />
				</Grid>
			</Fragment>
		);
	}
}

export default Admin;
