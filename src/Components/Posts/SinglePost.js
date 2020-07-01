import React, { useState, useEffect, useContext } from "react";
import { JssProvider } from "react-jss";
import { createGenerateClassName } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SinglePostDetails from "./SinglePostDetails";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { Link, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import Hidden from "@material-ui/core/Hidden";
import { singlePost, like, unlike } from "./ApiPost";
import Progress from "../Layouts/Progress";

import { AuthContext } from "../../context/Auth/AuthState";

const muiBaseTheme = createMuiTheme();

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
});

// const initialValues = {
// 	post: {},
// 	redirectToHome: false,
// 	redirectToSignin: false,
// 	like: false,
// 	likesCount: 0,
// 	comments: [],
// 	error: "",
// };

const initialValues = {
  post: {},
  redirectToSignin: false,
  like: false,
  loading: true,
  error: "",
};

function SinglePost(props) {
  const { isAuthenticated, user, token } = useContext(AuthContext);
  const [postData, setPostData] = useState(initialValues);
  const postId = props.match.params.postId;
  const slug = props.match.params.slug;
  const url = window.location.href;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

  // console.log(`postId = ${postId} slug=${slug}`);

  function fetchData() {
    singlePost(postId).then((data) => {
      if (data.error) {
        setPostData({ ...postData, error: data.error });
      } else {
        setPostData({
          ...postData,
          post: data,
          loading: false,
          like: checkLike(data.likes),
        });
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  const checkLike = (likes) => {
    if (isAuthenticated) {
      const userId = user._id;
      let match = likes.indexOf(userId) !== -1;
      return match;
    } else {
      return false;
    }
  };

  const likeToggle = () => {
    if (!isAuthenticated) {
      setPostData({ ...postData, redirectToSignin: true });
      return false;
    }
    let callApi = postData.like ? unlike : like;

    callApi(user._id, token, postData.post._id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPostData({ ...postData, like: !postData.like });
      }
    });
  };

  return postData.loading ? (
    <div style={{ textAlign: "center" }}>
      <Progress />
    </div>
  ) : postData.redirectToSignin ? (
    <Redirect to={`/signin`} />
  ) : (
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider
        theme={createMuiTheme({
          typography: {
            useNextVariants: true,
          },
          overrides: SinglePostDetails.getTheme(muiBaseTheme),
        })}
      >
        <Grid container justify="center">
          <Grid item xs={10} style={{ paddingTop: "8px" }} align="center">
            <Card className={"MuiPostCard--01"}>
              <CardMedia
                className={"MuiCardMedia-root"}
                image={
                  "https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80"
                }
              >
                <div className={"MuiTag--ribbon"}>
                  <Typography
                    color={"inherit"}
                    className={"MuiTypography-root"}
                  >
                    {postData.post.category.name}
                  </Typography>
                </div>
                <Avatar
                  className={"MuiAvatar-root"}
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${postData.post.postedBy._id}`}
                />
              </CardMedia>
              <CardContent className={"MuiCardContent-root"}>
                <Typography
                  className={"MuiTypography--heading"}
                  variant={"h6"}
                  gutterBottom
                >
                  {postData.post.title}
                </Typography>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                  {postData.post.body}
                </Typography>
              </CardContent>
              <CardActions className={"MuiCardActions-root"}>
                {/* <Hidden xsDown>
									<Typography variant={"caption"}>
										Posted by <Link to={`${posterId}`}>{posterName} </Link>
										on {formatDate(post.created)}
									</Typography>
								</Hidden> */}
                <div style={{ marginLeft: "auto" }}>
                  <IconButton href={facebookUrl} target="_blank">
                    <FacebookIcon />
                  </IconButton>
                  <IconButton href={linkedinUrl} target="_blank">
                    <InstagramIcon />
                  </IconButton>
                  <IconButton href={twitterUrl} target="_blank">
                    <TwitterIcon />
                  </IconButton>

                  <IconButton onClick={likeToggle}>
                    {postData.like ? (
                      <>
                        <Typography>{postData.post.likes}</Typography>
                        <Icon style={{ color: "#4d94ff" }}>
                          favorite_rounded
                        </Icon>
                      </>
                    ) : (
                      <Icon>favorite_rounded</Icon>
                    )}

                    {/* <Icon>favorite_border_rounded</Icon> */}
                  </IconButton>
                </div>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </JssProvider>
  );
}

SinglePost.getTheme = (muiBaseTheme) => ({
  MuiCard: {
    root: {
      "&.MuiPostCard--01": {
        // transition: "0.3s",
        maxWidth: "100%",
        margin: "auto",
        // boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
        // "&:hover": {
        // 	transform: "translateY(-3px)",
        // 	boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
        // },
        "& .MuiCardMedia-root": {
          paddingTop: "30.25%",
          position: "relative",
          "& .MuiTag--ribbon": {
            position: "absolute",
            top: muiBaseTheme.spacing(2),
            left: muiBaseTheme.spacing(2),
            backgroundColor: muiBaseTheme.palette.secondary.main,
            color: "#ffffff !important",
            padding: "2px 8px",
            boxShadow: "0 2px 12px 2px rgba(0,0,0,0.5)",
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
            "&:before, &:after": {
              position: "absolute",
              right: -16,
              content: '" "',
              borderLeft: `16px solid ${muiBaseTheme.palette.secondary.main}`,
            },
            "&:before": {
              top: 0,
              borderBottom: "12px solid transparent",
            },
            "&:after": {
              bottom: 0,
              borderTop: "12px solid transparent",
            },
            "& .MuiTypography-root": {
              fontWeight: "bold",
            },
          },
          "& .MuiAvatar-root": {
            position: "absolute",
            right: "12%",
            bottom: 0,
            transform: "translateY(20%)",
            width: 48,
            height: 48,
            zIndex: 1,
          },
          "&:after": {
            content: '" "',
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            borderBottom: "32px solid #ffffff",
            borderLeft: "400px solid transparent",
          },
        },
        "& .MuiCardContent-root": {
          textAlign: "left",
          padding: muiBaseTheme.spacing(3),
        },
        "& .MuiTypography--heading": {
          fontWeight: "bold",
        },
        "& .MuiTypography--subheading": {
          lineHeight: 1.8,
          fontSize: "16px",
        },
        "& .MuiCardActions-root": {
          padding: `0 ${muiBaseTheme.spacing(3)}px ${muiBaseTheme.spacing(
            3,
          )}px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      },
    },
  },
});
SinglePost.displayName = "Card";
SinglePost.metadata = {
  name: "Post Card",
  description: "Personal Post",
};

export default SinglePost;
