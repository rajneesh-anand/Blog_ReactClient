import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& > * + *": {
			marginLeft: theme.spacing(2),
		},
	},
}));

export default function Progress() {
	const classes = useStyles();

	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				marginRight: "-50%",
			}}
		>
			<CircularProgress />
			{/* <CircularProgress color="secondary" /> */}
		</div>
	);
}
