import React from "react";
import TechCard from "./TechCard";
import Grid from "@material-ui/core/Grid";

const TechList = props => {
	return (
		<Grid container spacing={3}>
			{props.news.map(user => (
				<TechCard key={user.id} user={user} />
			))}
		</Grid>
	);
};

export default TechList;
