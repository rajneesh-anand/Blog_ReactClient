import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	card: {
		display: "flex"
	},
	cardDetails: {
		flex: 1
	},
	cardMedia: {
		width: 160
	}
});

export default function FeaturedPost(props) {
	const classes = useStyles();
	const { post } = props;
	const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
	const posterName = post.postedBy ? post.postedBy.name : " Unknown";

	return (
		<Grid item xs={12} md={6}>
			{/* <CardActionArea component="a" href="#"> */}
			<Card className={classes.card}>
				<div className={classes.cardDetails}>
					<CardContent>
						<Typography component="h2" variant="h5">
							{post.title}
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							Posted by <Link to={`${posterId}`}>{posterName} </Link>
							on {new Date(post.created).toDateString()}
						</Typography>
						<Typography variant="subtitle1" paragraph>
							{post.body}
						</Typography>
						<Typography variant="subtitle1" color="primary">
							<Link to={`/post/${post._id}`}>Continue reading..</Link>
						</Typography>
					</CardContent>
				</div>
				<Hidden xsDown>
					<CardMedia
						className={classes.cardMedia}
						image={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
						title={post.title}
					/>
				</Hidden>
			</Card>
			{/* </CardActionArea> */}
		</Grid>
	);
}

FeaturedPost.propTypes = {
	post: PropTypes.object
};
