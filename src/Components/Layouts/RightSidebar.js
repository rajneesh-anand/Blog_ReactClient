import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Speaker from "../Images/speaker1.jpg";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles(theme => ({
	sidebarAboutBox: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.grey[200]
	},
	sidebarSection: {
		marginTop: theme.spacing(3)
	},
	media: {
		height: 280
	}
}));

const sidebar = {
	title: "About",
	description:
		"Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",

	sections: [
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
	],
	social: [
		{ id: 1, name: "GitHub", icon: GitHubIcon },
		{ id: 2, name: "Twitter", icon: TwitterIcon },
		{ id: 3, name: "Facebook", icon: FacebookIcon }
	]
};

function RightSidebar(props) {
	const classes = useStyles();

	return (
		<>
			<Card>
				<CardContent style={{ backgroundColor: "orange" }}>
					<Typography gutterBottom variant="h5" component="h2" align="center">
						Today's Cheapest Deal
					</Typography>
				</CardContent>
				<CardActionArea>
					<CardMedia
						image={Speaker}
						className={classes.media}
						title="Contemplative Reptile"
					/>
				</CardActionArea>
				<CardActions style={{ justifyContent: "center" }}>
					<Button
						size="small"
						color="primary"
						variant="contained"
						style={{ backgroundColor: "orange" }}
						href="https://www.amazon.in/All-new-Echo-Dot-3rd-Gen/dp/B07PFFMP9P/ref=asc_df_B07PFFMP9P/?tag=googleshopdes-21&linkCode=df0&hvadid=397009308901&hvpos=&hvnetw=g&hvrand=14831419316143759191&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9075215&hvtargid=pla-821432917562&psc=1&ext_vrnc=hi"
						target="_blank"
					>
						Order Now
					</Button>
				</CardActions>
			</Card>

			<Divider style={{ marginTop: "8px" }} />

			{sidebar.sections.map((element, index) => (
				<Button
					variant="contained"
					color="primary"
					key={index}
					component={Link}
					to={element.url}
					style={{ margin: "8px" }}
				>
					{element.title}
				</Button>
			))}

			<Divider />

			{/* <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
				Archives
			</Typography>
			{archives.map(archive => (
				<Button display="block" href={archive.url} key={archive.id}>
					{archive.title}
				</Button>
			))} */}
			<Typography variant="h6" gutterBottom className={classes.sidebarSection}>
				Social
			</Typography>
			{sidebar.social.map(network => (
				<Button display="block" href="#" key={network.id}>
					<Grid container direction="row" spacing={1} alignItems="center">
						<Grid item>
							<network.icon />
						</Grid>
						<Grid item>{network.name}</Grid>
					</Grid>
				</Button>
			))}
		</>
	);
}

RightSidebar.propTypes = {
	archives: PropTypes.array,
	description: PropTypes.string,
	social: PropTypes.array,
	title: PropTypes.string
};

export default RightSidebar;
