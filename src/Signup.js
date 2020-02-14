import React, { Component } from "react";
import { signup } from "./Auth";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { red } from "@material-ui/core/colors";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://thefunfacts.club">
				www.thefunfacts.club
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = theme => ({
	paper: {
		marginTop: theme.spacing(7),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
});

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			error: "",
			open: false,
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
		const { name, email, password } = this.state;
		const user = {
			name,
			email,
			password
		};
		console.log(user);
		if (this.state.recaptcha) {
			signup(user).then(data => {
				if (data.error) {
					this.setState({ error: data.error });
					console.log(data.error);
				} else
					this.setState({
						error: "",
						name: "",
						email: "",
						password: "",
						open: true
					});
			});
		} else {
			this.setState({
				error: "What day is today? Please write a correct answer!"
			});
		}
	};
	signupForm = (name, email, password, recaptcha) => (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={this.props.paper} style={{ marginTop: 15 }}>
				<Typography component="h1" variant="h5" align="center">
					Sign up
				</Typography>

				<form className={this.props.form} noValidate>
					<Grid container spacing={2}>
						<Grid item item xs={12}>
							<div
								style={{
									display: this.state.error ? "" : "none",
									color: "red"
								}}
							>
								{this.state.error}
							</div>
						</Grid>
						<Grid item item xs={12}>
							<div style={{ display: this.state.open ? "" : "none" }}>
								New account is successfully created. Please{" "}
								<Link href="/signin">Sign In</Link>.
							</div>
						</Grid>
						<Grid item xs={12}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="Full Name"
								autoFocus
								onChange={this.handleChange("name")}
								value={name}
							/>
						</Grid>
						{/* <Grid item xs={12} sm={6}>
				<TextField
				  variant="outlined"
				  required
				  fullWidth
				  id="lastName"
				  label="Last Name"
				  name="lastName"
				  autoComplete="lname"
				/>
			  </Grid> */}
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
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

							{/* <FormControlLabel
								label={recaptcha ? "Thanks. You got it!" : "What day is today?"}
							/> */}
						</Grid>
						<Grid item item xs={12}>
							<div
								style={{
									display: recaptcha ? "" : "none ",
									color: "red"
								}}
							></div>
						</Grid>

						{/* <Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid> */}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={this.props.submit}
							onClick={this.clickSubmit}
						>
							Sign Up
						</Button>
					</Grid>

					<Grid container justify="flex-end">
						<Grid item style={{ marginTop: 15 }}>
							<Link href="/signin" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);

	render() {
		const { name, email, password, error, open, recaptcha } = this.state;

		return (
			<React.Fragment>
				{this.signupForm(name, email, password, recaptcha)}
			</React.Fragment>
		);
	}
}

export default withStyles(useStyles)(Signup);
