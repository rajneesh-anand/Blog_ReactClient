import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { AuthContext } from "../../Context/Auth/AuthState";
import { QuizContext } from "../../Context/Quiz/QuizState";
import Fab from "@material-ui/core/Fab";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import { comment, uncomment } from "./APITravel";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";

import List from "@material-ui/core/List";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		height: 400,
		maxWidth: 300,
		backgroundColor: theme.palette.background.paper
	},
	comment: {
		marginRight: theme.spacing(1),
		width: "75%"
	},
	button: {
		marginTop: 12
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
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					padding: "8px"
				}}
			>
				<Fab color="default" aria-label="add" size="medium">
					{comments.length > 0 ? comments.length : ""}
					<ModeCommentIcon color="secondary" />
				</Fab>
				<Typography style={{ paddingTop: "16px" }}>
					{data.error !== "" ? data.error : "What you have to say ?"}
				</Typography>
			</div>

			<form>
				<TextField
					variant="outlined"
					className={classes.comment}
					multiline
					name="text"
					label="Write your comments ..."
					type="text"
					value={data.text}
					onChange={handleChange}
				/>

				<Button
					variant="contained"
					color="secondary"
					className={classes.button}
					onClick={addComment}
					startIcon={<AddIcon />}
					size="small"
				>
					Post
				</Button>
			</form>

			<hr />

			<List style={{ maxHeight: 300, overflow: "auto" }}>
				{comments.map((comment, i) => (
					<ListItem key={i}>
						<Link
							to={`/user/${comment.postedBy._id}`}
							style={{ textDecoration: "none" }}
						>
							<Avatar
								alt={comment.postedBy.name}
								src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
							/>
						</Link>
						<Typography color="primary">{comment.postedBy.name}</Typography>
						<Typography style={{ marginLeft: "16px" }}>
							{comment.text}
						</Typography>
						{isAuthenticated && user._id === comment.postedBy._id && (
							<IconButton
								style={{ marginLeft: "auto" }}
								onClick={() => deleteComment(comment)}
							>
								<DeleteIcon color="secondary" />
							</IconButton>
						)}
					</ListItem>
				))}
			</List>
		</div>
	);
}

export default Comment;
