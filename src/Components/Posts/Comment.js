import React, { Component } from "react";
import { comment, uncomment } from "./ApiPost";
import { isAuthenticated } from "../Auth";
import { Link } from "react-router-dom";
import DefaultProfile from "../Images/avatar.jpg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import IconButton from "@material-ui/core/IconButton";

class Comment extends Component {
	state = {
		text: "",
		error: ""
	};

	handleChange = event => {
		this.setState({ error: "" });
		this.setState({ text: event.target.value });
	};

	isValid = () => {
		const { text } = this.state;
		if (!text.length > 0 || text.length > 150) {
			this.setState({
				error: "Comment should not be empty and less than 150 characters long"
			});
			return false;
		}
		return true;
	};

	addComment = e => {
		e.preventDefault();

		if (!isAuthenticated()) {
			this.setState({ error: "Please signin to leave a comment" });
			return false;
		}

		if (this.isValid()) {
			const userId = isAuthenticated().user._id;
			const token = isAuthenticated().token;
			const postId = this.props.postId;

			comment(userId, token, postId, { text: this.state.text }).then(data => {
				if (data.error) {
					console.log(data.error);
				} else {
					this.setState({ text: "" });
					// dispatch fresh list of coments to parent (SinglePost)
					this.props.updateComments(data.comments);
				}
			});
		}
	};

	deleteComment = comment => {
		const userId = isAuthenticated().user._id;
		const token = isAuthenticated().token;
		const postId = this.props.postId;

		uncomment(userId, token, postId, comment).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.props.updateComments(data.comments);
			}
		});
	};

	deleteConfirmed = comment => {
		let answer = window.confirm(
			"Are you sure you want to delete your comment?"
		);
		if (answer) {
			this.deleteComment(comment);
		}
	};

	render() {
		const { comments } = this.props;
		const { error } = this.state;

		return (
			<>
				<div>
					<h2>Leave a comment</h2>

					<form onSubmit={this.addComment}>
						<TextField
							label="Leave a comment ...."
							multiline
							rowsMax="4"
							value={this.state.text}
							onChange={this.handleChange}
							style={{ width: "400px" }}
						/>

						<button style={{ marginTop: "25px", marginLeft: "15px" }}>
							Post
						</button>
					</form>
				</div>
				<div
					className="alert alert-danger"
					style={{ display: error ? "" : "none" }}
				>
					{error}
				</div>

				<div>
					<IconButton>
						{comments.length}
						<ModeCommentIcon />
					</IconButton>
					{/* <h3 className="text-primary"> </h3> */}
					<hr />
					{comments.map((comment, i) => (
						<div key={i}>
							<div>
								<Link to={`/user/${comment.postedBy._id}`}>
									<img
										style={{
											borderRadius: "50%",
											border: "1px solid black"
										}}
										height="30px"
										width="30px"
										onError={i => (i.target.src = `${DefaultProfile}`)}
										src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
										alt={comment.postedBy.name}
									/>
								</Link>

								<p className="lead">{comment.text}</p>
								<p className="font-italic mark">
									Posted by{" "}
									<Link to={`/user/${comment.postedBy._id}`}>
										{comment.postedBy.name}{" "}
									</Link>
									on {new Date(comment.created).toDateString()}
									<span>
										{isAuthenticated().user &&
											isAuthenticated().user._id === comment.postedBy._id && (
												<>
													<span
														onClick={() => this.deleteConfirmed(comment)}
														className="text-danger float-right mr-1"
													>
														Remove
													</span>
												</>
											)}
									</span>
								</p>
							</div>
						</div>
					))}
				</div>
			</>
		);
	}
}

export default Comment;
