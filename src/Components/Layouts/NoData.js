import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function NoData() {
	return (
		<div
			style={{
				textAlign: "center",
				marginTop: 100,
				// marginRight: "-50%",
			}}
		>
			<Typography color="textSecondary">
				Sorry ! We didn't find any post
			</Typography>

			<Button
				variant="contained"
				color="primary"
				size="small"
				component={Link}
				to="/signin"
			>
				Publish your own post
			</Button>
		</div>
	);
}
