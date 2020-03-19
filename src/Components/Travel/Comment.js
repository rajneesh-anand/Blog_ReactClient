import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { AuthContext } from "../../Context/Auth/AuthState";
import { QuizContext } from "../../Context/Quiz/QuizState";
import Fab from "@material-ui/core/Fab";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import { comment, uncomment } from "./APITravel";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "100%"
		}
	},
	comment: {
		marginRight: theme.spacing(1),
		width: "80%"
	}
}));

function Comment(props) {
	const classes = useStyles();
	const { isAuthenticated, user, token } = React.useContext(AuthContext);
	const { quizId, comments, resetData } = React.useContext(QuizContext);

	const [data, setData] = useState({
		text: "",
		error: "",
		redirectToSignin: false
	});

	const handleChange = event => {
		setData({ ...data, [event.target.name]: event.target.value, error: "" });
	};

	const isValid = () => {
		if (!data.text.length > 0) {
			setData({
				...data,
				error: "Comment should not be empty !"
			});
			return false;
		}
		return true;
	};

	const addComment = e => {
		e.preventDefault();

		if (!isAuthenticated) {
			// setData({ error: "Please signin to leave a comment" });
			setData({ redirectToSignin: true });
			return false;
		}

		if (isValid()) {
			comment(user._id, token, quizId, { text: data.text }).then(data => {
				if (data.error) {
					console.log(data.error);
				} else {
					setData({ text: "", error: "Thank You , Keep commenting .... " });
					// dispatch fresh list of coments to parent (SinglePost)
					resetData("active", "1");
				}
			});
		}
	};

	const deleteComment = comment => {
		uncomment(user._id, token, quizId, comment).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				resetData("active", "1");
			}
		});
	};

	if (data.redirectToSignin) {
		return <Redirect to={`/signin`} />;
	}

	return (
		<>
			<div className={classes.root}>
				<div
					className={classes.comment}
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<Fab color="default" aria-label="add" size="medium">
						{comments.length}
						<ModeCommentIcon color="secondary" />
					</Fab>
					<Typography style={{ paddingTop: "16px" }}>
						{data.error !== "" ? data.error : "What you have to say ?"}
					</Typography>
				</div>
				<form noValidate autoComplete="off">
					<TextField
						variant="outlined"
						className={classes.comment}
						// required
						name="text"
						label="Write your comments ..."
						type="text"
						value={data.text}
						onChange={handleChange}
					/>
					<span>
						<Fab color="default" aria-label="add">
							<IconButton onClick={addComment}>
								<AddIcon color="secondary" />
							</IconButton>
						</Fab>
					</span>
				</form>
			</div>

			<hr />
			{comments.map((comment, i) => (
				<div key={i}>
					<div style={{ display: "flex" }}>
						<Link
							to={`/user/${comment.postedBy._id}`}
							style={{ textDecoration: "none" }}
						>
							<Avatar
								alt={comment.postedBy.name}
								src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
							/>

							{/* <img
								style={{
									borderRadius: "50%",
									border: "1px solid black"
								}}
								height="30px"
								width="30px"
								// onError={i => (i.target.src = `${DefaultProfile}`)}
								src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
								alt={comment.postedBy.name}
							/> */}
						</Link>
						<Typography color="primary">{comment.postedBy.name}</Typography>
						<Typography style={{ marginLeft: "16px" }}>
							{comment.text}
						</Typography>
						{isAuthenticated && user._id === comment.postedBy._id && (
							<>
								<IconButton
									style={{ marginLeft: "auto" }}
									onClick={() => deleteComment(comment)}
								>
									<DeleteIcon color="secondary" />
								</IconButton>
							</>
						)}
					</div>
				</div>
			))}
		</>
	);
}

export default Comment;
