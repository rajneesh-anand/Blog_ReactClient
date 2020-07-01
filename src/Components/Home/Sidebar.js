import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Speaker from "../Images/speaker1.jpg";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

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

export default function Sidebar(props) {
	const classes = useStyles();
	const { archives, description, social, title, sections } = props;

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

			{sections.map((element, index) => (
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

			{/* <Paper elevation={0} className={classes.sidebarAboutBox}>
				<Typography variant="h6" gutterBottom>
					{title}
				</Typography>
				<Typography>{description}</Typography>
				<img src={Speaker} alt="speaker" />
			</Paper> */}
			<Divider />

			<Typography variant="h6" gutterBottom className={classes.sidebarSection}>
				Archives
			</Typography>
			{archives.map(archive => (
				<Button display="block" href={archive.url} key={archive.id}>
					{archive.title}
				</Button>
			))}
			<Typography variant="h6" gutterBottom className={classes.sidebarSection}>
				Social
			</Typography>
			{social.map(network => (
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

Sidebar.propTypes = {
	archives: PropTypes.array,
	description: PropTypes.string,
	social: PropTypes.array,
	title: PropTypes.string
};
