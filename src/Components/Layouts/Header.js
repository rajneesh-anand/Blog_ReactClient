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
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { signout, isAuthenticated } from "../Auth";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
// import Footer from "./Footer";
import SearchIcon from "@material-ui/icons/Search";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonIcon from "@material-ui/icons/Person";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const StyledMenu = withStyles({
	paper: {
		border: "1px solid #d3d4d5"
	}
})(props => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "center"
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center"
		}}
		{...props}
	/>
));

const drawerWidth = 256;

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		height: 99
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
	large: {
		width: theme.spacing(10),
		height: theme.spacing(10)
	},

	borderBottom: `1px solid ${theme.palette.divider}`,
	drawerPaper: {
		width: drawerWidth
	},

	logoTitle: {
		flexGrow: 1
	},
	toolbarSecondary: {
		justifyContent: "space-between",
		overflowX: "auto"
	},
	toolbarLink: {
		padding: theme.spacing(1),
		flexShrink: 0
	},
	styleMenuItem: {
		fontFamily: "Roboto",
		fontSize: "12px",
		textTransform: "uppercase",
		fontWeight: "bold"
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

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const changeEvent = event => {
		setAnchorEl(event.currentTarget ? false : true);
		setMobileOpen(mobileOpen ? true : false);
	};

	function handleDrawerToggle() {
		console.log(!mobileOpen);
		setMobileOpen(!mobileOpen ? true : false);
	}

	const classes = useStyles();

	const drawer = (
		<Fragment>
			<Grid container style={{ justifyContent: "center" }} direction="column">
				<Grid item align="center" style={{ paddingTop: "10px" }}>
					{isAuthenticated() && (
						<Fragment>
							<Avatar
								alt={isAuthenticated().user.name}
								src={`${process.env.REACT_APP_API_URL}/user/photo/${
									isAuthenticated().user._id
								}`}
								className={classes.large}
							/>
							<h3>{` Hi ${isAuthenticated().user.name}`}</h3>
							<Button
								component={Link}
								to={`/user/${isAuthenticated().user._id}`}
								onClick={handleDrawerToggle}
								style={isActive(history, `/user/${isAuthenticated().user._id}`)}
							>
								My PAGE
							</Button>
							<Button
								style={{ cursor: "pointer" }}
								onClick={() => signout(() => history.push("/"))}
							>
								Sign Out
							</Button>
						</Fragment>
					)}

					{!isAuthenticated() && (
						<Fragment>
							<Button
								component={Link}
								style={isActive(history, "/signup")}
								onClick={handleDrawerToggle}
								to="/signup"
							>
								REGISTER
							</Button>
							<Button
								component={Link}
								style={isActive(history, "/signin")}
								to="/signin"
								onClick={handleDrawerToggle}
							>
								LOGIN
							</Button>
						</Fragment>
					)}
				</Grid>

				<Divider />
				<Grid item align="center">
					<List>
						{sections.map(section => (
							<ListItem color="inherit" key={section.title}>
								<Button
									component={Link}
									size="small"
									to={section.url}
									onClick={handleDrawerToggle}
								>
									{section.title}
								</Button>
							</ListItem>
						))}
					</List>
				</Grid>
			</Grid>
			{/* <Footer
				title="Footer"
				description="Something here to give the footer a purpose!"
			/> */}
		</Fragment>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="sticky" color="default">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.logoTitle}>
						<Link
							style={(isActive(history, "/"), { textDecoration: "none" })}
							to="/"
						>
							<img src="../images/logo.png" alt="logo" />
						</Link>
					</Typography>

					<div style={{ marginRight: "96px" }} className={classes.appBar}>
						{sections.map(section => (
							<Button
								color="inherit"
								component={Link}
								key={section.title}
								to={section.url}
								style={isActive(history, `${section.url}`)}
								className={classes.toolbarLink}
							>
								{section.title}
							</Button>
						))}
					</div>

					<IconButton>
						<SearchIcon />
					</IconButton>

					{!isAuthenticated() && (
						<Hidden smDown>
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
						</Hidden>
					)}
					{isAuthenticated() && (
						<Hidden smDown>
							<Button
								aria-controls="customized-menu"
								aria-haspopup="true"
								// variant="contained"
								// color="primary"
								onClick={handleClick}
							>
								{` Hi ${isAuthenticated().user.name}`}
							</Button>

							<StyledMenu
								id="customized-menu"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClick={handleClose}
							>
								<MenuItem
									component={Link}
									to={`/user/${isAuthenticated().user._id}`}
									style={isActive(
										history,
										`/user/${isAuthenticated().user._id}`
									)}
								>
									<ListItemIcon>
										<PersonIcon fontSize="small" />
									</ListItemIcon>
									<Typography className={classes.styleMenuItem}>
										Profile
									</Typography>
								</MenuItem>

								<MenuItem
									component={Link}
									to={`/post/create`}
									style={isActive(history, `/post/create`)}
								>
									<ListItemIcon>
										<PostAddIcon fontSize="small" />
									</ListItemIcon>
									<Typography className={classes.styleMenuItem}>
										New Post
									</Typography>
								</MenuItem>

								<MenuItem onClick={() => signout(() => history.push("/"))}>
									<ListItemIcon>
										<ExitToAppIcon fontSize="small" />
									</ListItemIcon>
									<Typography className={classes.styleMenuItem}>
										Sign Out
									</Typography>
								</MenuItem>
							</StyledMenu>
						</Hidden>
					)}
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
		</div>
	);
};

Header.propTypes = {
	sections: PropTypes.array,
	title: PropTypes.string
};

export default withRouter(Header);
