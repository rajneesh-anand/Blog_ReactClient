import React, { useState, useEffect, Component } from "react";
import { isAuthenticated } from "../Auth";
import { create } from "./APIQuiz";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { AuthContext } from "../../Context/Auth/AuthState";

const NewQuiz = () => {
	const { isAuthenticated, user, token } = React.useContext(AuthContext);

	const [data, setData] = useState({
		title: "",
		bodyFirst: "",
		bodySecond: "",
		photoFirst: "",
		photoSecond: "",
		error: "",
		loading: false,
		redirectToProfile: false,
		validationError: "",
		status: "active"
	});

	useEffect(() => {
		if (isAuthenticated) {
		}
	}, [isAuthenticated]);

	const handleInputChange = event => {
		setData({
			...data,
			[event.target.name]: event.target.value
		});
		// formData.set(event.target.name, event.target.value);
	};

	const photoHandleChange = event => {
		setData({ ...data, [event.target.name]: event.target.files[0] });
	};

	const clickSubmit = event => {
		event.preventDefault();
		// this.setState({ loading: true });

		// console.log(userId);
		// console.log(token);
		const formData = new FormData();

		formData.append("status", "active");
		formData.append("bodyFirst", data.bodyFirst);
		formData.append("bodySecond", data.bodySecond);
		formData.append("title", data.title);
		formData.append("photoFirst", data.photoFirst);
		formData.append("photoSecond", data.photoSecond);

		create(user._id, token, formData).then(data => {
			if (data.error) setData({ ...data, error: data.error });
			else {
				console.log("new posts : ", data);
				setData({
					...data,
					loading: false,
					title: "",

					redirectToProfile: true
				});
			}
		});
	};

	if (data.redirectToProfile) {
		return <Redirect to={`/user/${user._id}`} />;
	}

	return (
		<Grid container style={{ justifyContent: "center" }}>
			<Typography
				variant="h6"
				gutterBottom
				color="secondary"
				style={{ marginTop: 30 }}
			>
				WHAT DO YOU WANT TO COMPARE ?
			</Typography>

			<Grid item xs={12} sm={10}>
				<div style={{ display: data.error ? "" : "none" }}>
					<InputLabel style={{ color: "red" }}>{data.error}</InputLabel>
				</div>
				<TextField
					required
					id="blogTitle"
					name="title"
					value={data.title}
					label="Subject Title !"
					fullWidth
					autoComplete="blog"
					onChange={handleInputChange}
					style={{ textTransform: "uppercase" }}
				/>

				<InputLabel id="photo" style={{ textTransform: "uppercase" }}>
					First Image
				</InputLabel>
				<Input
					type="file"
					name="photoFirst"
					onChange={photoHandleChange}
					type="file"
					accept="image/*"
					style={{ width: 350, marginBottom: 30 }}
				/>

				<TextField
					required
					id="body"
					value={data.bodyFirst}
					name="bodyFirst"
					label="Describe Subject Details"
					fullWidth
					autoComplete="Write"
					multiline={true}
					rows={4}
					rowsMax={5}
					onChange={handleInputChange}
					style={{ textTransform: "uppercase" }}
				/>
				<InputLabel id="photo" style={{ textTransform: "uppercase" }}>
					Second Image
				</InputLabel>
				<Input
					type="file"
					name="photoSecond"
					onChange={photoHandleChange}
					type="file"
					accept="image/*"
					style={{ width: 350, marginBottom: 30 }}
				/>

				<TextField
					required
					id="body2"
					value={data.bodySecond}
					name="bodySecond"
					label="Describe Subject Details"
					fullWidth
					autoComplete="Write"
					multiline={true}
					rows={4}
					rowsMax={5}
					onChange={handleInputChange}
					style={{ textTransform: "uppercase" }}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={clickSubmit}
					style={{ marginTop: 30, marginBottom: 30 }}
				>
					Create Post
				</Button>
			</Grid>
		</Grid>
	);
};
export default NewQuiz;
