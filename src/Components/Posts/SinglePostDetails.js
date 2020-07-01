import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { singlePost } from "./ApiPost";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import Hidden from "@material-ui/core/Hidden";

import { AuthContext } from "../../Context/Auth/AuthState";

const initialValues = {
	redirectToHome: false,
	redirectToSignin: false,
	like: false,
	likesCount: 0,
	comments: [],
};

function SinglePostDetails(props) {
	const { post } = props;
	console.log(post);
	const { isAuthenticated, user, token } = useContext(AuthContext);
	const [values, setValues] = useState(initialValues);

	const url = window.location.href;
	const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
	const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`;
	const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

	const checkLike = (likes) => {
		const userId = user._id;
		let match = likes.indexOf(userId) !== -1;
		return match;
	};

	useEffect(() => {
		setValues({
			...values,
			likesCount: post.likes.length,
			like: checkLike(post.likesCount),
			comments: post.comments,
		});
	}, []);

	const formatDate = (string) => {
		let options = { year: "numeric", month: "short", day: "numeric" };
		return new Date(string).toLocaleDateString([], options);
	};

	// const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
	// const posterName = post.postedBy ? post.postedBy.name : " Unknown";
	// const photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}`;

	return (
		<Grid item xs={12} style={{ paddingTop: "8px" }} align="center">
			<Card className={"MuiPostCard--01"}>
				<CardMedia
					className={"MuiCardMedia-root"}
					image={
						"https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80"
					}
				>
					<div className={"MuiTag--ribbon"}>
						<Typography color={"inherit"} className={"MuiTypography-root"}>
							{post.category.name}
						</Typography>
					</div>
					<Avatar
						className={"MuiAvatar-root"}
						src={`${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}`}
					/>
				</CardMedia>
				<CardContent className={"MuiCardContent-root"}>
					<Typography
						className={"MuiTypography--heading"}
						variant={"h6"}
						gutterBottom
					>
						{post.title}
					</Typography>
					<Typography
						className={"MuiTypography--subheading"}
						variant={"caption"}
					>
						{post.body}
					</Typography>
				</CardContent>
				{/* <CardActions className={"MuiCardActions-root"}>
					<Hidden xsDown>
						<Typography variant={"caption"}>
							Posted by <Link to={`${posterId}`}>{posterName} </Link>
							on {formatDate(post.created)}
						</Typography>
					</Hidden>
					<div style={{ marginLeft: "auto" }}>
						<IconButton href={facebookUrl} target="_blank">
							<FacebookIcon />
						</IconButton>
						<IconButton href={linkedinUrl} target="_blank">
							<InstagramIcon />
						</IconButton>
						<IconButton href={twitterUrl} target="_blank">
							<TwitterIcon />
						</IconButton>
						
						<IconButton onClick={}>
							{values.like ? (
								<>
									<Typography>{values.likesCount}</Typography>
									<Icon style={{ color: "#4d94ff" }}>favorite_rounded</Icon>
								</>
							) : (
								<Icon>favorite_rounded</Icon>
							)}

							<Icon>favorite_border_rounded</Icon>
						</IconButton>
					</div>
				</CardActions> */}
			</Card>
		</Grid>
	);
}

SinglePostDetails.getTheme = (muiBaseTheme) => ({
	MuiCard: {
		root: {
			"&.MuiPostCard--01": {
				transition: "0.3s",
				maxWidth: "100%",
				margin: "auto",
				boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
				"&:hover": {
					transform: "translateY(-3px)",
					boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
				},
				"& .MuiCardMedia-root": {
					paddingTop: "30.25%",
					position: "relative",
					"& .MuiTag--ribbon": {
						position: "absolute",
						top: muiBaseTheme.spacing(2),
						left: muiBaseTheme.spacing(2),
						backgroundColor: muiBaseTheme.palette.secondary.main,
						color: "#ffffff !important",
						padding: "2px 8px",
						boxShadow: "0 2px 12px 2px rgba(0,0,0,0.5)",
						borderTopLeftRadius: 2,
						borderBottomLeftRadius: 2,
						"&:before, &:after": {
							position: "absolute",
							right: -16,
							content: '" "',
							borderLeft: `16px solid ${muiBaseTheme.palette.secondary.main}`,
						},
						"&:before": {
							top: 0,
							borderBottom: "12px solid transparent",
						},
						"&:after": {
							bottom: 0,
							borderTop: "12px solid transparent",
						},
						"& .MuiTypography-root": {
							fontWeight: "bold",
						},
					},
					"& .MuiAvatar-root": {
						position: "absolute",
						right: "12%",
						bottom: 0,
						transform: "translateY(20%)",
						width: 48,
						height: 48,
						zIndex: 1,
					},
					"&:after": {
						content: '" "',
						position: "absolute",
						left: 0,
						bottom: 0,
						width: "100%",
						borderBottom: "32px solid #ffffff",
						borderLeft: "400px solid transparent",
					},
				},
				"& .MuiCardContent-root": {
					textAlign: "left",
					padding: muiBaseTheme.spacing(3),
				},
				"& .MuiTypography--heading": {
					fontWeight: "bold",
				},
				"& .MuiTypography--subheading": {
					lineHeight: 1.8,
					fontSize: "16px",
				},
				"& .MuiCardActions-root": {
					padding: `0 ${muiBaseTheme.spacing(3)}px ${muiBaseTheme.spacing(
						3
					)}px`,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				},
			},
		},
	},
});
SinglePostDetails.displayName = "Card";
SinglePostDetails.metadata = {
	name: "Post Card",
	description: "Personal Post",
};

export default SinglePostDetails;
