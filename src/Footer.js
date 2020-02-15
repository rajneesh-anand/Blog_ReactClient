import React from "react";
import PropTypes from "prop-types";
import {
	makeStyles,
	createMuiTheme,
	ThemeProvider
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const theme = createMuiTheme({
	typography: {
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(","),
		fontSize: 12
	}
});

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
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default function Footer(props) {
	const classes = useStyles();
	const { description, title } = props;

	return (
		<footer className={classes.footer}>
			<Container maxWidth="lg">
				<ThemeProvider theme={theme}>
					<Typography align="center" gutterBottom>
						{title}
					</Typography>
					<Typography align="center">{description}</Typography>
					<Copyright />
				</ThemeProvider>
			</Container>
		</footer>
	);
}

Footer.propTypes = {
	description: PropTypes.string,
	title: PropTypes.string
};
