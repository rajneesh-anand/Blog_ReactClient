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
import Footer from "./Footer";
import SearchIcon from "@material-ui/icons/Search";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonIcon from "@material-ui/icons/Person";
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

const StyledMenuItem = withStyles(theme => ({
	root: {
		"&:focus": {
			backgroundColor: "#99ccff",
			"& .MuiListItemIcon-root, & .MuiListItemText-primary": {
				color: theme.palette.common.white
			}
		}
	}
}))(MenuItem);

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
	large: {
		width: theme.spacing(10),
		height: theme.spacing(10)
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
			<Footer
				title="Footer"
				description="Something here to give the footer a purpose!"
			/>
		</Fragment>
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
						<h3 className="logo">E | FLOW</h3>
					</Link>
				</Typography>

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
							<StyledMenuItem>
								<ListItemIcon>
									<PersonIcon fontSize="small" />
								</ListItemIcon>
								<Button
									size="small"
									component={Link}
									to={`/user/${isAuthenticated().user._id}`}
									style={isActive(
										history,
										`/user/${isAuthenticated().user._id}`
									)}
								>
									Profile
								</Button>
								{/* <ListItemText fontSize="small" primary="Profile" /> */}
							</StyledMenuItem>
							<StyledMenuItem>
								<ListItemIcon>
									<ExitToAppIcon fontSize="small" />
								</ListItemIcon>
								<Button
									style={{ cursor: "pointer" }}
									size="small"
									onClick={() => signout(() => history.push("/"))}
								>
									Sign Out
								</Button>
								{/* <ListItemText primary="Drafts" /> */}
							</StyledMenuItem>
							{/* <StyledMenuItem>
									<ListItemIcon>
										<InboxIcon fontSize="small" />
									</ListItemIcon>
									<ListItemText primary="Inbox" />
								</StyledMenuItem> */}
						</StyledMenu>
					</Hidden>
				)}
			</Toolbar>

			<AppBar position="sticky" className={classes.appBar} color="default">
				<Toolbar
					component="nav"
					variant="dense"
					className={classes.toolbarSecondary}
					// position="sticky"
					// className={classes.toolbar}
					// style={{ position: "sticky" }}
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
