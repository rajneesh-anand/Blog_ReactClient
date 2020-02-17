import React, { Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { signout, isAuthenticated } from "../Auth";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import SearchIcon from "@material-ui/icons/Search";

const drawerWidth = 256;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.down("sm")]: {
			display: "none"
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none"
		}
	},
	toolbar: theme.mixins.toolbar,

	borderBottom: `1px solid ${theme.palette.divider}`,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(1)
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
	{ title: "Travel", url: "/posts/travel" }
];

const isActive = (history, path) => {
	if (history.location.pathname === path) return { color: "blue" };
	else return { color: "black" };
};

const Header = ({ history }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const classes = useStyles();

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const changeEvent = event => {
		setAnchorEl(event.currentTarget ? false : true);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function handleDrawerToggle() {
		setMobileOpen(!mobileOpen);
	}

	const drawer = (
		<div>
			<List>
				{sections.map(section => (
					<ListItem color="inherit" key={section.title}>
						<Button component={Link} size="small" to={section.url}>
							{section.title}
						</Button>
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<React.Fragment>
			<CssBaseline />

			<Toolbar className={classes.toolbar}>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>

				<Button className={classes.appBar} size="small">
					Subscribe
				</Button>

				<Typography
					component="h2"
					variant="h5"
					color="inherit"
					align="center"
					className={classes.toolbarTitle}
				>
					<Link style={isActive(history, "/")} to="/">
						Blog
					</Link>
				</Typography>

				<IconButton>
					<SearchIcon />
				</IconButton>

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
					<Fragment>
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
					</Fragment>
				)}
			</Toolbar>

			<AppBar position="sticky" className={classes.appBar} color="default">
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

			<Hidden smUp implementation="css">
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					classes={{
						paper: classes.drawerPaper
					}}
					ModalProps={{
						keepMounted: true
					}}
				>
					{drawer}
				</Drawer>
			</Hidden>
		</React.Fragment>
	);
};

Header.propTypes = {
	sections: PropTypes.array,
	title: PropTypes.string
};

export default withRouter(Header);
