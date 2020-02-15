import React from "react";
import DesignCard from "./DesignCard";
import Grid from "@material-ui/core/Grid";

const DesignList = props => {
	return (
		<Grid container spacing={3}>
			{props.posts.map(post => (
				<DesignCard key={post._id} post={post} />
			))}
		</Grid>
	);
};

export default DesignList;
