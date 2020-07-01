import React from "react";
import EduCard from "./EduCard";
import NoData from "../Layouts/NoData";
import Grid from "@material-ui/core/Grid";

const EduList = (props) => {
	return props.posts.length > 0 ? (
		<Grid container justify="center">
			{props.posts.map((post) => (
				<EduCard key={post._id} post={post} />
			))}
		</Grid>
	) : (
		<NoData />
	);
};

export default EduList;
