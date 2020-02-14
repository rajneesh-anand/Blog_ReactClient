import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "./Auth";
import { remove } from "./apiUser";
import { signout } from "./Auth";
import Button from "@material-ui/core/Button";

class DeleteUser extends Component {
	state = {
		redirect: false
	};

	deleteAccount = () => {
		const token = isAuthenticated().token;
		const userId = this.props.userId;
		remove(userId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				// signout user
				signout(() => console.log("User is deleted"));
				// redirect
				this.setState({ redirect: true });
			}
		});
	};

	deleteConfirmed = () => {
		let answer = window.confirm(
			"Are you sure you want to delete your account?"
		);
		if (answer) {
			this.deleteAccount();
		}
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to="/" />;
		}
		return (
			<Button
				onClick={this.deleteConfirmed}
				variant="contained"
				color="secondary"
			>
				Delete Profile
			</Button>
		);
	}
}

export default DeleteUser;
