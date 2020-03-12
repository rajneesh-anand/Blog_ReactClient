import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(1, 0),
		height: "60px"
	},

	ul: {
		listStyleType: "none",
		display: "flex",
		justifyContent: "space-between",
		"& li": {
			padding: "0 8px"
		}
	}
}));

function Copyright() {
	return (
		<Typography>
			{"Copyright © "}
			<Link color="inherit" to="https://material-ui.com/">
				Your Website
			</Link>
			{` ${new Date().getFullYear()}`}
		</Typography>
	);
}

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Grid container direction="row" justify="center" alignItems="center">
				<Copyright />

				<ul className={classes.ul}>
					<li>
						<Typography>
							<a href="/privacy" target="_blank" rel="noopener noreferrer">
								Privacy Policy
							</a>
						</Typography>
					</li>
					<li>
						<Typography>
							<a href="/contact">Contact</a>
						</Typography>
					</li>
					<li>
						<Typography>
							<a href="http://" target="_blank" rel="noopener noreferrer">
								Terms of Use
							</a>
						</Typography>
					</li>
				</ul>
			</Grid>
		</footer>
	);
};

Footer.propTypes = {
	description: PropTypes.string,
	title: PropTypes.string
};

export default withRouter(Footer);
