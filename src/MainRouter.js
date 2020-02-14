import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Blog from "./Blog";
import Signup from "./Signup";
import Signin from "./Signin";
import Header from "./Header";
import history from "./History";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import NewPost from "./NewPost";
import SinglePost from "./SinglePost";

const MainRouter = () => (
	<div>
		{/* <Link style={isActive(history, "/")} to="/"></Link> */}
		<Header />
		<Switch>
			<Route exact path="/" component={Blog} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/signin" component={Signin} />
			{/* <Route exact path="/post/:postId" component={SinglePost} /> */}
			<PrivateRoute exact path="/user/:userId" component={Profile} />
			<PrivateRoute exact path="/post/create" component={NewPost} />
			<Route exact path="/post/:postId" component={SinglePost} />
		</Switch>
	</div>
);

export default MainRouter;
