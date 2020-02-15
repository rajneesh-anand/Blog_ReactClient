import React from "react";
import { Route, Switch } from "react-router-dom";
import Blog from "./Blog";
import Signup from "./Signup";
import Signin from "./Signin";
import Header from "./Header";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import NewPost from "./NewPost";
import SinglePost from "./SinglePost";
import EditProfile from "./EditProfile";
import Admin from "./Admin";
import Technology from "./Components/Technology";
import Design from "./Components/Design";

const MainRouter = () => (
	<div>
		<Header />
		<Switch>
			<Route exact path="/" component={Blog} />
			<Route exact path="/posts/technology" component={Technology} />
			<Route exact path="/posts/design" component={Design} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/signin" component={Signin} />
			<PrivateRoute exact path="/admin" component={Admin} />
			<PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
			<PrivateRoute exact path="/user/:userId" component={Profile} />
			<PrivateRoute exact path="/post/create" component={NewPost} />
			<Route exact path="/post/:postId" component={SinglePost} />
		</Switch>
	</div>
);

export default MainRouter;
