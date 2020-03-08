/* eslint-disable max-len,no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import DefaultProfile from "../Images/mountains.jpg";

const formatDate = string => {
	let options = { year: "numeric", month: "short", day: "numeric" };
	return new Date(string).toLocaleDateString([], options);
};

const slugify = v => {
	if (typeof v === "string") {
		return v
			.toString()
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^\w\-]+/g, "")
			.replace(/\-\-+/g, "-")
			.replace(/^-+/, "")
			.replace(/-+$/, "");
	}
	return "";
};

const TravelCard = props => {
	const { post } = props;
	const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
	const posterName = post.postedBy ? post.postedBy.name : " Unknown";
	const photoUrl = post.photo ? post.photo : DefaultProfile;
	const postTitle = slugify(post.title);
	return (
		<Card className={"MuiNewsCard--01"}>
			<CardContent>
				<Typography
					className={"MuiTypography--heading"}
					variant={"h6"}
					gutterBottom
				>
					{post.title}
				</Typography>
			</CardContent>
			<CardMedia className={"MuiCardMedia-root"} image={photoUrl}>
				<Typography className={"MuiTypography--category"}>
					{post.category.name}
				</Typography>
			</CardMedia>
			<CardContent className={"MuiCardContent-root"}>
				<Typography
					className={"MuiTypography--overline"}
					variant="button"
					style={{ fontSize: "0.7rem" }}
					gutterBottom
				>
					posted by <Link to={`${posterId}`}>{posterName} </Link>
					on {formatDate(post.created)}
				</Typography>
				<Typography
					className={"MuiTypography--heading"}
					variant={"h6"}
					gutterBottom
				>
					{post.title}
				</Typography>
				<Typography className={"MuiTypography--subheading"} variant={"caption"}>
					{post.body}
				</Typography>
			</CardContent>
			<CardActions className={"MuiCardActions-root"}>
				<Button
					color={"primary"}
					fullWidth
					component={Link}
					to={`/post/${post._id}/${postTitle}`}
				>
					Find Out More <Icon>chevron_right_rounded</Icon>
				</Button>
			</CardActions>
		</Card>
	);
};

TravelCard.getTheme = muiBaseTheme => ({
	MuiCard: {
		root: {
			"&.MuiNewsCard--01": {
				maxWidth: "100%",
				margin: "auto",
				transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
				boxShadow: "none",
				borderRadius: 0,
				"& button": {
					marginLeft: 0
				},
				"&:hover": {
					// transform: "scale(1.04)",
					boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
				},
				"& .MuiCardMedia-root": {
					paddingTop: "40%",
					position: "relative",
					"& .MuiTypography--category": {
						color: "rgba(255, 255, 255, 0.87)",
						position: "absolute",
						top: muiBaseTheme.spacing(2.5),
						left: muiBaseTheme.spacing(2.5),
						letterSpacing: 0.5,
						fontWeight: 900
					}
				},
				"& .MuiCardContent-root": {
					textAlign: "left",
					padding: muiBaseTheme.spacing(3),
					"& .MuiTypography--overline": {
						color: muiBaseTheme.palette.grey[500],
						fontWeight: "bold"
					},
					"& .MuiTypography--heading": {
						fontWeight: 900,
						lineHeight: 1.3
					},
					"& .MuiTypography--subheading": {
						lineHeight: 1.8,
						color: muiBaseTheme.palette.text.primary,
						// fontWeight: "bold",
						fontSize: "16px",
						fontFamily: "Tahoma"
					}
				},
				"& .MuiCardActions-root": {
					padding: `0 ${muiBaseTheme.spacing(3)}px ${muiBaseTheme.spacing(
						3
					)}px`,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center"
				}
			}
		}
	},
	MuiButton: {
		root: {
			"& svg, .material-icons": {
				marginLeft: muiBaseTheme.spacing
			}
		},
		label: {
			textTransform: "initial"
		}
	}
});
TravelCard.metadata = {
	name: "News Card",
	description: "Best for Blog"
};

export default TravelCard;
