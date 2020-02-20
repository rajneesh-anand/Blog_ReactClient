import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6, 0)
	}
}));

function Copyright() {
	return (
		<Typography align="center">
			{"Copyright © "}
			<Link color="inherit" to="https://material-ui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const Footer = props => {
	const classes = useStyles();
	const { description, title } = props;

	return (
		<footer className={classes.footer}>
			<Container maxWidth="lg">
				<Typography gutterBottom></Typography>
				<Typography align="center">{description}</Typography>
				<Copyright />
				<a href="/privacy" target="_blank" rel="noopener noreferrer">
					Privacy
				</a>
				<a href="/contact" target="_blank" rel="noopener noreferrer">
					Contact
				</a>
			</Container>
		</footer>
	);
};

Footer.propTypes = {
	description: PropTypes.string,
	title: PropTypes.string
};

export default withRouter(Footer);
