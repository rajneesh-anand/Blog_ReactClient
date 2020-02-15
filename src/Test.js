import React from "react";
import TestItem from "./TestItem";
import Grid from "@material-ui/core/Grid";

const Test = props => {
	return (
		<Grid container spacing={3}>
			{props.news.map(user => (
				<TestItem key={user.id} user={user} />
			))}
		</Grid>
	);
};

export default Test;
