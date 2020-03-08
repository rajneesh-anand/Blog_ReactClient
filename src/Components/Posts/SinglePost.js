import React from "react";
import { JssProvider } from "react-jss";
import { createGenerateClassName } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SinglePostDetails from "./SinglePostDetails";
import Grid from "@material-ui/core/Grid";

const muiBaseTheme = createMuiTheme();

const generateClassName = createGenerateClassName({
	dangerouslyUseGlobalCSS: true
});

function SinglePost(props) {
	const postId = props.match.params.postId;
	const slug = props.match.params.slug;
	console.log(`postId = ${postId} slug=${slug}`);
	return (
		<JssProvider generateClassName={generateClassName}>
			<MuiThemeProvider
				theme={createMuiTheme({
					typography: {
						useNextVariants: true
					},
					overrides: SinglePostDetails.getTheme(muiBaseTheme)
				})}
			>
				<Grid container justify="center">
					<SinglePostDetails postId={postId} slug={slug} />
				</Grid>
			</MuiThemeProvider>
		</JssProvider>
	);
}

export default SinglePost;
