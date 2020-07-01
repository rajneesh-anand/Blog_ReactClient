import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	root: {
		maxWidth: 420
	},
	media: {
		height: 140
	},
	fonts: {
		fontSize: 15,
		fontFamily: "Tahoma"
	}
});

export default function DesignCard(props) {
	const classes = useStyles();
	const { post } = props;

	const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
	const posterName = post.postedBy ? post.postedBy.name : " Unknown";

	return (
		<Grid item xs={12} md={4} align="center">
			<Card className={classes.root}>
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{post.title}
						</Typography>
						<CardMedia
							className={classes.media}
							image={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
							title={post.title}
						/>

						<Typography variant="body2" color="textSecondary" component="p">
							{post.body}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Typography className={classes.fonts}>
						posted by <Link to={`${posterId}`}>{posterName} </Link>
						on {new Date(post.created).toDateString("dd.MMM.yyyy")}
					</Typography>

					<Button
						size="small"
						color="primary"
						component={Link}
						to={`/post/${post._id}`}
					>
						Read More
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}
