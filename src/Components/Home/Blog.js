import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import MainFeaturedPost from "./MainFeaturedPost";
// import LeftSidebar from "../Layouts/LeftSidebar";
import Posts from "../Posts/Posts";
// import RightSidebar from "../Layouts/RightSidebar";

const mainFeaturedPost = {
	title: "Title of a longer featured blog post",
	description:
		"Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
	image: "https://source.unsplash.com/random",
	imgText: "main image description",
	linkText: "Continue reading…"
};

export default function Blog() {
	return (
		<React.Fragment>
			<CssBaseline />

			<Grid container justify="center" style={{ height: "calc(100% - 160px)" }}>
				<Grid item xs={12} sm={12}>
					<MainFeaturedPost post={mainFeaturedPost} />
				</Grid>

				{/* <Grid item xs={12} sm={3}>
					<LeftSidebar />
				</Grid> */}
				<Grid item xs={12} sm={10}>
					<Posts />
				</Grid>
				{/* <Grid item xs={12} sm={3}>
					<RightSidebar />
				</Grid> */}
			</Grid>
		</React.Fragment>
	);
}
