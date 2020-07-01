import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import IconButton from "@material-ui/core/IconButton";
import { AuthContext } from "../../context/Auth/AuthState";
import { QuizContext } from "../../context/Quiz/QuizState";
import { like, unlike } from "./APITravel";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 140,
    width: "100%",
  },
});

function QuizCard() {
  const { isAuthenticated, user, token } = React.useContext(AuthContext);
  const {
    bodyFirst,
    bodySecond,
    title,
    comments,
    likesFirst,
    likesSecond,
    unlikesFirst,
    unlikesSecond,
    quizId,
    resetData,
  } = React.useContext(QuizContext);

  const [data, setData] = useState({
    likeFirstStatus: false,
    likeSecondStatus: false,
    unlikeSecondStatus: false,
    unlikeFirstStatus: false,
    redirectToSignin: false,
  });

  const checkLike = (likes) => {
    let match = likes.indexOf(user._id) !== -1;
    return match;
  };

  useEffect(() => {
    if (isAuthenticated) {
      setData({
        ...data,
        likeFirstStatus: checkLike(likesFirst),
        unlikeFirstStatus: checkLike(unlikesFirst),
      });
    } else {
      setData({
        ...data,
        likeFirstStatus: false,
        unlikeFirstStatus: false,
      });
    }
  }, [unlikesFirst, likesFirst, isAuthenticated]);

  const classes = useStyles();

  const likeUnlikeToggle = (likeId, likesNumber) => {
    if (!isAuthenticated) {
      setData({ ...data, redirectToSignin: true });
      return false;
    }

    let callApi = likeId ? unlike : like;

    callApi(user._id, token, quizId, likesNumber).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      resetData("active", "1");
    });
  };

  if (data.redirectToSignin) {
    return <Redirect to={`/signin`} />;
  }

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${process.env.REACT_APP_API_URL}/quiz/photo/1/active`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {bodyFirst}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>

        <IconButton
          onClick={() => likeUnlikeToggle(data.likeFirstStatus, "likesFirst")}
        >
          <Typography>
            {" "}
            {likesFirst.length > 0 ? likesFirst.length : ""}
          </Typography>
          {data.likeFirstStatus ? (
            <ThumbUpAltIcon style={{ color: "#4d94ff" }} />
          ) : (
            <ThumbUpAltIcon />
          )}
        </IconButton>

        <IconButton
          onClick={() =>
            likeUnlikeToggle(data.unlikeFirstStatus, "unlikesFirst")
          }
        >
          <Typography>
            {unlikesFirst.length > 0 ? unlikesFirst.length : ""}
          </Typography>
          {data.unlikeFirstStatus ? (
            <ThumbDownAltIcon style={{ color: "#4d94ff" }} />
          ) : (
            <ThumbDownAltIcon />
          )}
        </IconButton>

        <IconButton>
          <Typography>{comments.length > 0 ? comments.length : ""}</Typography>
          <ModeCommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default QuizCard;
