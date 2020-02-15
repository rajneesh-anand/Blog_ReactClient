import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
	root: {
		maxWidth: 345
	},
	media: {
		height: 140
	}
});

export default function TestItem(props) {
	const classes = useStyles();

	return (
		<Grid item xs={12} md={4} align="center">
			<Card className={classes.root}>
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{props.user.name}
						</Typography>
						<CardMedia
							className={classes.media}
							image="https://source.unsplash.com/random"
							title="Contemplative Reptile"
						/>

						<Typography variant="body2" color="textSecondary" component="p">
							{props.user.description}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">
						Share
					</Button>
					<Button size="small" color="primary" href={props.url}>
						Read More
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}

// import React from "react";
// import { Link } from "react-router-dom";

// const TestItem = props => {
// 	return (
// 		<div className="card col-md-4">
// 			<div className="card-body">
// 				<h5 className="card-title">{props.user.name}</h5>
// 				<p className="card-text">{props.user.description}</p>

// 				<a
// 					className="btn btn-raised btn-primary btn-sm"
// 					target="_blank"
// 					href={props.user.url}
// 				>
// 					{" "}
// 					Read more
// 				</a>

// 				<Link
// 					to={`${props.user.url}`}
// 					className="btn btn-raised btn-primary btn-sm"
// 					target="_blank"
// 				>
// 					Read more
// 				</Link>
// 			</div>
// 		</div>
// 	);
// };

// export default TestItem;
