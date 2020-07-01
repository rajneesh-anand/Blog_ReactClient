import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { socialLogin, authenticate } from "../Auth";

class SocialLogin extends Component {
	constructor() {
		super();
		this.state = {
			redirectToReferrer: false
		};
	}

	responseGoogle = response => {
		console.log("response", response);
		// const { googleId, name, email, imageUrl } = response.profileObj;
		// const user = {
		// 	password: googleId,
		// 	name: name,
		// 	email: email,
		// 	imageUrl: imageUrl
		// };
		const tokenId = response.tokenId;
		console.log("social-tokenid" + tokenId);
		const user = {
			tokenId: tokenId
		};

		socialLogin(user).then(data => {
			// console.log('signin data: ', data);
			if (data.error) {
				console.log("Error Login. Please try again..");
			} else {
				// console.log('signin success - setting jwt: ', data);
				authenticate(data, () => {
					console.log("social login response from api", data);
					this.setState({ redirectToReferrer: true });
				});
			}
		});
	};

	render() {
		// redirect
		const { redirectToReferrer } = this.state;
		if (redirectToReferrer) {
			return <Redirect to="/" />;
		}

		return (
			<GoogleLogin
				clientId="283812412955-tr8vh4g1huffbn5qi9o6de3m5bqpfl1d.apps.googleusercontent.com"
				buttonText="Login with Google"
				onSuccess={this.responseGoogle}
				onFailure={this.responseGoogle}
			/>
		);
	}
}

export default SocialLogin;
