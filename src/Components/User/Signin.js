import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../Auth";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SocialLogin from "./SocialLogin";
import { Divider } from "@material-ui/core";

class Signin extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			error: "",
			redirectToReferer: false,
			loading: false,
			recaptcha: false
		};
	}

	handleChange = name => event => {
		this.setState({ error: "" });
		this.setState({ [name]: event.target.value });
	};

	recaptchaHandler = e => {
		this.setState({ error: "" });
		let userDay = e.target.value.toLowerCase();
		let dayCount;

		if (userDay === "sunday") {
			dayCount = 0;
		} else if (userDay === "monday") {
			dayCount = 1;
		} else if (userDay === "tuesday") {
			dayCount = 2;
		} else if (userDay === "wednesday") {
			dayCount = 3;
		} else if (userDay === "thursday") {
			dayCount = 4;
		} else if (userDay === "friday") {
			dayCount = 5;
		} else if (userDay === "saturday") {
			dayCount = 6;
		}

		if (dayCount === new Date().getDay()) {
			this.setState({ recaptcha: true });
			return true;
		} else {
			this.setState({
				recaptcha: false
			});
			return false;
		}
	};

	clickSubmit = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const { email, password } = this.state;
		const user = {
			email,
			password
		};

		if (this.state.recaptcha) {
			signin(user).then(data => {
				if (data.error) {
					this.setState({ error: data.error, loading: false });
				} else {
					authenticate(data, () => {
						this.setState({ redirectToReferer: true });
					});
				}
			});
		} else {
			this.setState({
				loading: false,
				error: "What day is today? Please write a correct answer!"
			});
		}
	};

	signinForm = (email, password, recaptcha) => (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div style={{ marginTop: 15 }}>
				<Typography component="h1" variant="h5" align="center">
					Sign In
				</Typography>

				<form className={this.props.form} noValidate>
					<Grid container spacing={2} justify="space-between">
						<Grid item xs={12}>
							<div
								style={{
									display: this.state.error ? "" : "none",
									color: "red"
								}}
							>
								{this.state.error}
							</div>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								type="email"
								label="Email Address"
								name="email"
								value={email}
								autoComplete="email"
								onChange={this.handleChange("email")}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								value={password}
								id="password"
								autoComplete="current-password"
								onChange={this.handleChange("password")}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								name="recaptcha"
								variant="outlined"
								required
								fullWidth
								id="reCapcha"
								label="What day is Today ?"
								onChange={this.recaptchaHandler}
							/>
						</Grid>
						<Grid item xs={12}>
							<div
								style={{
									display: recaptcha ? "" : "none ",
									color: "red"
								}}
							></div>
						</Grid>

						<Grid
							container
							item
							xs={12}
							justify="space-between"
							direction="row-reverse"
						>
							<Button
								type="submit"
								// fullWidth
								variant="contained"
								color="primary"
								size="small"
								// className={this.props.submit}
								onClick={this.clickSubmit}
							>
								Login
							</Button>

							<Link href="/forgot-password" variant="body2">
								Forgot Password ?
							</Link>
						</Grid>
					</Grid>
				</form>
				<Divider style={{ margin: "10px 0px" }} />
				<SocialLogin />
			</div>
		</Container>
	);

	render() {
		const {
			email,
			password,
			error,
			redirectToReferer,
			loading,
			recaptcha
		} = this.state;

		if (redirectToReferer) {
			return <Redirect to="/" />;
		}

		return (
			<React.Fragment>
				{this.signinForm(email, password, recaptcha)}
			</React.Fragment>
		);
	}
}

export default Signin;
