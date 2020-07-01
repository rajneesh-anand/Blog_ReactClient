import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Blog";
import Signup from "./Components/User/Signup";
import Signin from "./Components/User/Signin";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
// import Header from "./Components/Layouts/Header";
// import Footer from "./Components/Layouts/Footer";
import Profile from "./Components/User/Profile";
// import NewProfile from "./Components/User/NewProfile";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import NewPost from "./Components/Posts/NewPost";
import SinglePost from "./Components/Posts/SinglePost";
import EditProfile from "./Components/User/EditProfile";
import EditPost from "./Components/Posts/EditPost";
import Admin from "./Components/Admin";
import Technology from "./Components/Technology";
import Education from "./Components/Education";
import Testing from "./Components/Travel/QuizCard";
import NewQuiz from "./Components/Quiz/NewQuiz";

const MainRouter = () => (
	<div>
		<Switch>
			<Route exact path="/" component={Home} />

			<Route exact path="/posts/technology" component={Technology} />

			<Route exact path="/posts/education" component={Education} />

			<Route exact path="/signup" component={Signup} />
			<Route exact path="/signin" component={Signin} />
			<Route exact path="/forgot-password" component={ForgotPassword} />
			<Route
				exact
				path="/reset-password/:resetPasswordToken"
				component={ResetPassword}
			/>
			<Route exact path="/posts/travel" component={Testing} />
			<PrivateRoute exact path="/admin" component={Admin} />
			<PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
			<PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
			<PrivateRoute exact path="/user/:userId" component={Profile} />
			{/* <PrivateRoute exact path="/user/:userId" component={NewProfile} /> */}
			<PrivateRoute exact path="/post/create" component={NewPost} />
			<PrivateRoute exact path="/quiz/create" component={NewQuiz} />
			<Route exact path="/post/:postId/:slug" component={SinglePost} />
		</Switch>
	</div>
);

export default MainRouter;
