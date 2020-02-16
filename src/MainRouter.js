import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Blog";
import Signup from "./Components/User/Signup";
import Signin from "./Components/User/Signin";
import Header from "./Components/Layouts/Header";
import Footer from "./Components/Layouts/Footer";
import Profile from "./Components/User/Profile";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import NewPost from "./Components/Posts/NewPost";
import SinglePost from "./Components/Posts/SinglePost";
import EditProfile from "./Components/User/EditProfile";
import Admin from "./Components/Admin";
import Technology from "./Components/Technology";
import Design from "./Components/Design";

const MainRouter = () => (
	<div>
		<Header />
		<Switch>
			<Route exact path="/" component={Home} />
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
		<Footer
			title="Footer"
			description="Something here to give the footer a purpose!"
		/>
	</div>
);

export default MainRouter;
