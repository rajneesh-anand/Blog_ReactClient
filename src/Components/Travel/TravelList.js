import React from "react";
import { JssProvider } from "react-jss";
import clsx from "clsx";
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
import Comment from "../Posts/Comment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TelegramIcon from "@material-ui/icons/Telegram";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from "@material-ui/core/InputLabel";

import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "100%"
		}
	}
}));

const muiBaseTheme = createMuiTheme();

const generateClassName = createGenerateClassName({
	dangerouslyUseGlobalCSS: true
});

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

function TravelList(props) {
	const classes = useStyles();
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
				<Grid
					container
					// justify="center"
					style={{ height: "calc(100% - 160px)" }}
				>
					<TravelCard quiz={props.posts} />

					<form className={classes.root} noValidate autoComplete="off">
						<Input
							id="standard-adornment-password"
							placeholder="password"
							// onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton

									//   onClick={handleClickShowPassword}
									>
										<TelegramIcon color="secondary" />
									</IconButton>
								</InputAdornment>
							}
						/>
					</form>
				</Grid>
			</MuiThemeProvider>
		</JssProvider>
	);
}

export default TravelList;
