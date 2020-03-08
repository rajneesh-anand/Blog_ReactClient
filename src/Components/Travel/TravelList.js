import React from "react";
import { JssProvider } from "react-jss";
import { createGenerateClassName } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TravelCard from "./TravelCard";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Speaker from "../Images/speaker1.jpg";
import Button from "@material-ui/core/Button";

const muiBaseTheme = createMuiTheme();

const generateClassName = createGenerateClassName({
	dangerouslyUseGlobalCSS: true
});

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

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
				<Grid container style={{ marginTop: "8px" }}>
					<Grid item xs={12} sm={9}>
						{props.posts.map(post => (
							<TravelCard key={post._id} post={post} />
						))}
					</Grid>
					<Grid item xs={12} sm={3}>
						<Card style={{ marginBottom: "8px" }}>
							<CardContent style={{ backgroundColor: "orange" }}>
								<Typography
									gutterBottom
									variant="h5"
									component="h2"
									align="center"
								>
									Today's Cheapest Deal
								</Typography>
							</CardContent>
							<CardActionArea>
								<CardMedia
									image={Speaker}
									style={{ height: "280px" }}
									title="Contemplative Reptile"
								/>
							</CardActionArea>
							<CardActions style={{ justifyContent: "center" }}>
								<Button
									size="small"
									color="primary"
									variant="contained"
									style={{ backgroundColor: "orange" }}
									href="https://www.amazon.in/All-new-Echo-Dot-3rd-Gen/dp/B07PFFMP9P/ref=asc_df_B07PFFMP9P/?tag=googleshopdes-21&linkCode=df0&hvadid=397009308901&hvpos=&hvnetw=g&hvrand=14831419316143759191&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9075215&hvtargid=pla-821432917562&psc=1&ext_vrnc=hi"
									target="_blank"
								>
									Order Now
								</Button>
							</CardActions>
						</Card>

						<Card>
							<CardContent style={{ backgroundColor: "orange" }}>
								<Typography
									gutterBottom
									variant="h5"
									component="h2"
									align="center"
								>
									Today's Cheapest Deal
								</Typography>
							</CardContent>
							<CardActionArea>
								<CardMedia
									image={Speaker}
									style={{ height: "280px" }}
									title="Contemplative Reptile"
								/>
							</CardActionArea>
							<CardActions style={{ justifyContent: "center" }}>
								<Button
									size="small"
									color="primary"
									variant="contained"
									style={{ backgroundColor: "orange" }}
									href="https://www.amazon.in/All-new-Echo-Dot-3rd-Gen/dp/B07PFFMP9P/ref=asc_df_B07PFFMP9P/?tag=googleshopdes-21&linkCode=df0&hvadid=397009308901&hvpos=&hvnetw=g&hvrand=14831419316143759191&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9075215&hvtargid=pla-821432917562&psc=1&ext_vrnc=hi"
									target="_blank"
								>
									Order Now
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</MuiThemeProvider>
		</JssProvider>
	);
}

export default TravelList;
