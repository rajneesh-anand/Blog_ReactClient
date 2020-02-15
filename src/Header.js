import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "./Auth";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles(theme => ({
	toolbar: {
		borderBottom: `1px solid ${theme.palette.divider}`
	},
	toolbarTitle: {
		flex: 1
	},
	toolbarSecondary: {
		justifyContent: "space-between",
		overflowX: "auto"
	},
	toolbarLink: {
		padding: theme.spacing(1),
		flexShrink: 0
	}
}));

const sections = [
	{ title: "Technology", url: "/posts/technology" },
	{ title: "Design", url: "/posts/design" },
	{ title: "Culture", url: "#" },
	{ title: "Business", url: "#" },
	{ title: "Politics", url: "#" },
	{ title: "Opinion", url: "#" },
	{ title: "Science", url: "#" },
	{ title: "Health", url: "#" },
	{ title: "Style", url: "#" },
	{ title: "Travel", url: "#" }
];

const isActive = (history, path) => {
	// console.log(`history = ${history.location.pathname} and path = ${path}`);
	if (history.location.pathname === path) return { color: "blue" };
	else return { color: "black" };
};

const Header = ({ history }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const changeEvent = event => {
		setAnchorEl(event.currentTarget ? false : true);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const classes = useStyles();

	return (
		<React.Fragment>
			<Toolbar className={classes.toolbar}>
				<Button size="small">Subscribe</Button>
				<Typography
					component="h2"
					variant="h5"
					color="inherit"
					align="center"
					className={classes.toolbarTitle}
				>
					Blog
				</Typography>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<Fragment>
					<Link style={isActive(history, "/")} to="/"></Link>
				</Fragment>
				<Fragment>
					{!isAuthenticated() && (
						<Fragment>
							<Button
								component={Link}
								style={isActive(history, "/signup")}
								to="/signup"
							>
								REGISTER
							</Button>
							<Button
								component={Link}
								style={isActive(history, "/signin")}
								to="/signin"
								onClick={changeEvent}
							>
								LOGIN
							</Button>
						</Fragment>
					)}

					{isAuthenticated() && (
						<div>
							{/* 
						<Button
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            
                        >
                            {` Welcome ${isAuthenticated().user.name}`}
                        </Button> */}

							<Button
								style={{ alignContent: "flex-end" }}
								aria-controls="simple-menu"
								aria-haspopup="true"
								onClick={handleClick}
							>
								{` Welcome ${isAuthenticated().user.name}`}
							</Button>
							<Menu
								id="simple-menu"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleClose}>
									<Button
										component={Link}
										to={`/user/${isAuthenticated().user._id}`}
										style={isActive(
											history,
											`/user/${isAuthenticated().user._id}`
										)}
									>
										My Profile
									</Button>
								</MenuItem>
								<MenuItem>
									<Button
										style={{ cursor: "pointer", color: "red" }}
										onClick={() => signout(() => history.push("/"))}
									>
										Sign Out
									</Button>
								</MenuItem>
							</Menu>
						</div>

						// <Button
						// 	style={{ cursor: "pointer", color: "red" }}
						// 	onClick={() => signout(() => history.push("/"))}
						// >
						// 	Sign Out
						// </Button>
					)}
				</Fragment>
			</Toolbar>
			<AppBar position="sticky" color="default">
				<Toolbar
					component="nav"
					variant="dense"
					className={classes.toolbarSecondary}
					style={{ position: "sticky" }}
				>
					{sections.map(section => (
						<Button
							color="inherit"
							key={section.title}
							href={section.url}
							className={classes.toolbarLink}
						>
							{section.title}
						</Button>
					))}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
};

Header.propTypes = {
	sections: PropTypes.array,
	title: PropTypes.string
};

export default withRouter(Header);
