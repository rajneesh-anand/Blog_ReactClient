// /* eslint-disable max-len,no-script-url,jsx-a11y/anchor-is-valid */
// import React, { useEffect } from "react";
// import Card from "@material-ui/core/Card";
// import { like, unlike } from "./APITravel";
// import { Redirect } from "react-router-dom";
// import { isAuthenticated } from "../Auth";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import Icon from "@material-ui/core/Icon";
// import { Link } from "react-router-dom";
// import DefaultProfile from "../Images/mountains.jpg";
// import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
// import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
// import IconButton from "@material-ui/core/IconButton";
// import Grid from "@material-ui/core/Grid";
// import Divider from "@material-ui/core/Divider";
// import { QuizContext } from "./index";

// const formatDate = string => {
// 	let options = { year: "numeric", month: "short", day: "numeric" };
// 	return new Date(string).toLocaleDateString([], options);
// };

// const TravelCard = () => {
// 	// const { state, dispatch } = React.useContext(QuizContext);

// 	// const [count, setCount] = React.useState({
// 	// 	likeFirst: false,
// 	// 	unlikeFirst: false,
// 	// 	likeSecond: false,
// 	// 	unlikeSecond: false,
// 	// 	likesFirst: 0,
// 	// 	unlikesFirst: 0,
// 	// 	likesSecond: 0,
// 	// 	unlikesSecond: 0,
// 	// 	redirectToHome: false,
// 	// 	redirectToSignin: false,
// 	// 	comments: []
// 	// });

// 	useEffect(() => {
// 		checkLike();
// 	}, []);

// 	const checkLike = () => {
// 		console.log(state.quiz.likesFirst);
// 		// const userId = isAuthenticated() && isAuthenticated().user._id;
// 		// let match = likes.indexOf(userId) !== -1;
// 		// console.log(match);
// 		// return match;
// 	};

// 	// const checkLike = likes => {
// 	// 	const likesArray = likes;
// 	// 	console.log(likesArray);
// 	// 	// const userId = isAuthenticated() && isAuthenticated().user._id;
// 	// 	// let match = likes.indexOf(userId) !== -1;
// 	// 	// console.log(match);
// 	// 	// return match;
// 	// };

// 	const likeUnlikeToggle = likesNumber => {
// 		if (!isAuthenticated()) {
// 			dispatch({
// 				type: "SET_REDIRECT_SIGNIN"
// 			});
// 			return false;
// 		}
// 		const likeId = state.likeFirstStatus;

// 		let callApi = likeId ? unlike : like;
// 		const userId = isAuthenticated().user._id;
// 		const token = isAuthenticated().token;
// 		const quizId = state.quiz._id;
// 		console.log(callApi);

// 		callApi(userId, token, quizId, likesNumber).then(data => {
// 			if (data.error) {
// 				console.log(data.error);
// 			} else {
// 				console.log(data);
// 				// setCount({ ...state, likesFirst: data.likesFirst, likeFirst: !likeId });
// 				dispatch({
// 					type: "SET_LIKE_UNLIKE",
// 					payload: data
// 				});
// 			}
// 		});
// 	};

// 	if (state.redirectToHome) {
// 		return <Redirect to={`/`} />;
// 	} else if (state.redirectToSignin) {
// 		return <Redirect to={`/signin`} />;
// 	}

// 	return (
// 		<Grid container>
// 			<Grid
// 				item
// 				xs={12}
// 				sm={4}
// 				style={{ marginRight: "16px", height: "calc(100% - 160px)" }}
// 			>
// 				<Card className={"MuiNewsCard--01"}>
// 					<CardMedia
// 						className={"MuiCardMedia-root"}
// 						image={`${process.env.REACT_APP_API_URL}/quiz/photo/1/active`}
// 						onError={i => (i.target.style.display = "none")}
// 					></CardMedia>

// 					<CardContent className={"MuiCardContent-root"}>
// 						<Typography
// 							className={"MuiTypography--subheading"}
// 							variant={"caption"}
// 						>
// 							{state.quiz._id}
// 						</Typography>
// 					</CardContent>

// 					<CardActions className={"MuiCardActions-root"}>
// 						<IconButton onClick={() => likeUnlikeToggle("likesFirst")}>
// 							{state.likeFirstStatus ? (
// 								<>
// 									<Typography>{state.likesFirst.length}</Typography>
// 									<ThumbUpAltIcon style={{ color: "#4d94ff" }} />
// 								</>
// 							) : (
// 								<Typography>
// 									{state.likesFirst.length}
// 									<ThumbUpAltIcon />
// 								</Typography>
// 							)}

// 							{state.likesFirst.length}
// 						</IconButton>
// 						<IconButton>
// 							<Typography></Typography>
// 							<ThumbDownAltIcon />
// 						</IconButton>
// 					</CardActions>
// 				</Card>
// 			</Grid>
// 			<Divider orientation="horizontal" />
// 			<Grid item xs={12} sm={4} style={{ marginLeft: "16px" }}>
// 				<Card className={"MuiNewsCard--01"}>
// 					{/* <CardContent>
// 					<Typography
// 						className={"MuiTypography--heading"}
// 						variant={"h6"}
// 						gutterBottom
// 					>
// 						{post.title}
// 					</Typography>
// 				</CardContent> */}
// 					<CardMedia
// 						className={"MuiCardMedia-root"}
// 						image={`${process.env.REACT_APP_API_URL}/quiz/photo/2/active`}
// 						onError={i => (i.target.style.display = "none")}
// 					>
// 						{/* <Typography className={"MuiTypography--category"}>
// 						{post.category.name}
// 					</Typography> */}
// 					</CardMedia>
// 					<CardContent className={"MuiCardContent-root"}>
// 						{/* <Typography
// 						className={"MuiTypography--overline"}
// 						variant="button"
// 						style={{ fontSize: "0.7rem" }}
// 						gutterBottom
// 					>
// 						posted by <Link to={`${posterId}`}>{posterName} </Link>
// 						on {formatDate(post.created)}
// 					</Typography> */}
// 						{/* <Typography
// 						className={"MuiTypography--heading"}
// 						variant={"h6"}
// 						gutterBottom
// 					>
// 						{post.title}
// 					</Typography> */}
// 						<Typography
// 							className={"MuiTypography--subheading"}
// 							variant={"caption"}
// 						>
// 							{state.quiz.bodySecond}
// 						</Typography>
// 					</CardContent>
// 					<CardActions className={"MuiCardActions-root"}>
// 						<IconButton>
// 							<Typography></Typography>
// 							<ThumbUpAltIcon />
// 						</IconButton>
// 						<IconButton>
// 							<Typography></Typography>
// 							<ThumbDownAltIcon />
// 						</IconButton>
// 					</CardActions>
// 				</Card>
// 			</Grid>
// 		</Grid>
// 	);
// };

// TravelCard.getTheme = muiBaseTheme => ({
// 	MuiCard: {
// 		root: {
// 			"&.MuiNewsCard--01": {
// 				maxWidth: "100%",
// 				height: "100%",
// 				margin: "auto",
// 				transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
// 				boxShadow: "none",
// 				borderRadius: 0,
// 				"& button": {
// 					marginLeft: 0
// 				},
// 				"&:hover": {
// 					// transform: "scale(1.04)",
// 					boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
// 				},
// 				"& .MuiCardMedia-root": {
// 					paddingTop: "40%",
// 					position: "relative",
// 					borderRadius: 0,
// 					"& .MuiTypography--category": {
// 						color: "rgba(255, 255, 255, 0.87)",
// 						position: "absolute",
// 						top: muiBaseTheme.spacing(2.5),
// 						left: muiBaseTheme.spacing(2.5),
// 						letterSpacing: 0.5,
// 						fontWeight: 900
// 					}
// 				},
// 				"& .MuiCardContent-root": {
// 					textAlign: "left",
// 					padding: muiBaseTheme.spacing(3),
// 					"& .MuiTypography--overline": {
// 						color: muiBaseTheme.palette.grey[500],
// 						fontWeight: "bold"
// 					},
// 					"& .MuiTypography--heading": {
// 						fontWeight: 900,
// 						lineHeight: 1.3
// 					},
// 					"& .MuiTypography--subheading": {
// 						lineHeight: 1.8,
// 						color: muiBaseTheme.palette.text.primary,
// 						// fontWeight: "bold",
// 						fontSize: "16px",
// 						fontFamily: "Tahoma"
// 					}
// 				},
// 				"& .MuiCardActions-root": {
// 					padding: `0 ${muiBaseTheme.spacing(3)}px ${muiBaseTheme.spacing(
// 						3
// 					)}px`,
// 					display: "flex",
// 					justifyContent: "flex-end",
// 					alignItems: "center"
// 				}
// 			}
// 		}
// 	},
// 	MuiButton: {
// 		root: {
// 			"& svg, .material-icons": {
// 				marginLeft: muiBaseTheme.spacing
// 			}
// 		},
// 		label: {
// 			textTransform: "initial"
// 		}
// 	}
// });
// TravelCard.metadata = {
// 	name: "News Card",
// 	description: "Best for Blog"
// };

// export default TravelCard;
