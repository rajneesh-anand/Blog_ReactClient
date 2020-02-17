import React from "react";
import { JssProvider } from "react-jss";
import { createGenerateClassName } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TravelCard from "./TravelCard";
import Grid from "@material-ui/core/Grid";

const muiBaseTheme = createMuiTheme();

const generateClassName = createGenerateClassName({
	dangerouslyUseGlobalCSS: true
});

function TravelList(props) {
	return (
		<JssProvider generateClassName={generateClassName}>
			<MuiThemeProvider
				theme={createMuiTheme({
					typography: {
						useNextVariants: true
					},
					overrides: TravelCard.getTheme(muiBaseTheme)
				})}
			>
				<Grid container style={{ marginTop: "15px", marginBottom: "30px" }}>
					{props.posts.map(post => (
						<TravelCard key={post._id} post={post} />
					))}
				</Grid>
			</MuiThemeProvider>
		</JssProvider>
	);
}

export default TravelList;
