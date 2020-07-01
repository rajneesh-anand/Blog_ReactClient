import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Blog";
import Signup from "./components/User/Signup";
import Signin from "./components/User/Signin";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
// import Header from "./components/Layouts/Header";
// import Footer from "./components/Layouts/Footer";
import Profile from "./components/User/Profile";
// import NewProfile from "./components/User/NewProfile";
import PrivateRoute from "./components/Auth/PrivateRoute";
import NewPost from "./components/Posts/NewPost";
import SinglePost from "./components/Posts/SinglePost";
import EditProfile from "./components/User/EditProfile";
import EditPost from "./components/Posts/EditPost";
import Admin from "./components/Admin";
import Technology from "./components/Technology";
import Education from "./components/Education";
import Testing from "./components/Travel/QuizCard";
import NewQuiz from "./components/Quiz/NewQuiz";

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
