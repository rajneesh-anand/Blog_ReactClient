import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Speaker from "../Images/speaker1.jpg";

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

function LeftSidebar() {
	const classes = useStyles();
	return (
		<div>
			<Card style={{ marginBottom: "8px" }}>
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

			{sidebar.sections.map((element, index) => (
				<Button
					// variant="contained"
					// color="primary"
					key={index}
					component={Link}
					to={element.url}
					style={{ margin: "8px" }}
				>
					{element.title}
				</Button>
			))}
		</div>
	);
}

export default LeftSidebar;
