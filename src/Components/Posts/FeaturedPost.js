import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import DefaultProfile from "../Images/mountains.jpg";
import SocialIcons from "../Layouts/SocialIcons";
import axios from "axios";

const useStyles = makeStyles({
	card: {
		borderRadius: 0
	},

	buttons: {
		color: "#3399ff",
		padding: "0px 6px"
	}
});

const formatDate = string => {
	let options = { year: "numeric", month: "short", day: "numeric" };
	return new Date(string).toLocaleDateString([], options);
};

const slugify = v => {
	if (typeof v === "string") {
		const a =
			"àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
		const b =
			"aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
		const p = new RegExp(a.split("").join("|"), "g");

		return v
			.toString()
			.toLowerCase()
			.replace(/\s+/g, "-") // Replace spaces with -
			.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, "-and-") // Replace & with 'and'
			.replace(/[^\w\-]+/g, "") // Remove all non-word characters
			.replace(/\-\-+/g, "-") // Replace multiple - with single -
			.replace(/^-+/, "") // Trim - from start of text
			.replace(/-+$/, ""); // Trim - from end of text
	}
	return "";
};

const FeaturedPost = props => {
	const classes = useStyles();
	const { post } = props;
	const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
	const posterName = post.postedBy ? post.postedBy.name : " Unknown";
	const postTitle = slugify(post.title);
	const url = window.location.href;

	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					{post.title}
				</Typography>

				<Typography variant="button" style={{ fontSize: "0.7rem" }}>
					Posted by
					<Link className={classes.buttons} to={`${posterId}`}>
						{posterName}
					</Link>
					on {formatDate(post.created)}
				</Typography>
			</CardContent>
			<CardMedia
				component="img"
				alt={post.title}
				height="320"
				image={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
				onError={i => (i.target.style.display = "none")}
				className={classes.buttons}
			/>
			<CardContent>
				<Typography variant="subtitle1" color="textPrimary" component="p">
					{post.body}
				</Typography>
			</CardContent>

			<CardActions style={{ justifyContent: "space-between" }}>
				<Button
					component={Link}
					size="small"
					to={`/post/${post._id}/${postTitle}`}
					color="primary"
				>
					Continue reading..
				</Button>
				<SocialIcons url={url} />
			</CardActions>
		</Card>
	);
};

FeaturedPost.propTypes = {
	post: PropTypes.object
};

export default FeaturedPost;
