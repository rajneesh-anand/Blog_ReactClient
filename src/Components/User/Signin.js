import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../Auth";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SocialLogin from "./SocialLogin";
import { Divider } from "@material-ui/core";
import { AuthContext } from "../../context/Auth/AuthState";

const Signin = (props) => {
  const { isAuthenticated, user, Signin, error } = React.useContext(
    AuthContext,
  );
  const initialState = {
    email: "",
    password: "",
    err: null,
    recaptcha: false,
    loading: false,
  };

  const [data, setData] = React.useState(initialState);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
      err: "",
    });
  };

  const recaptchaHandler = (e) => {
    setData({ ...data, err: null });
    let userDay = e.target.value.toLowerCase();
    let dayCount;

    if (userDay === "sunday") {
      dayCount = 0;
    } else if (userDay === "monday") {
      dayCount = 1;
    } else if (userDay === "tuesday") {
      dayCount = 2;
    } else if (userDay === "wednesday") {
      dayCount = 3;
    } else if (userDay === "thursday") {
      dayCount = 4;
    } else if (userDay === "friday") {
      dayCount = 5;
    } else if (userDay === "saturday") {
      dayCount = 6;
    }

    if (dayCount === new Date().getDay()) {
      setData({
        ...data,
        recaptcha: true,
      });
      // this.setState({ recaptcha: true });
      return true;
    } else {
      setData({
        ...data,
        recaptcha: false,
      });
      return false;
    }
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      loading: true,
    });

    const user = {
      email: data.email,
      password: data.password,
    };
    console.log(user);

    if (data.recaptcha) {
      Signin(user);
    } else {
      setData({
        ...data,
        err: "What day is today? Please write a correct answer!",
        loading: false,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ marginTop: 15 }}>
        <Typography component="h1" variant="h5" align="center">
          Sign In
        </Typography>

        <form noValidate>
          <Grid container spacing={2} justify="space-between">
            <Grid item xs={12}>
              <div
                style={{
                  display: error ? "" : "none",
                  color: "red",
                }}
              >
                {error}
              </div>
              <div
                style={{
                  display: data.err ? "" : "none",
                  color: "red",
                }}
              >
                {data.err}
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                value={data.email}
                autoComplete="email"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={data.password}
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="recaptcha"
                variant="outlined"
                required
                fullWidth
                id="reCapcha"
                label="What day is Today ?"
                onChange={recaptchaHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  display: data.recaptcha ? "" : "none ",
                  color: "red",
                }}
              ></div>
            </Grid>

            <Grid
              container
              item
              xs={12}
              justify="space-between"
              direction="row-reverse"
            >
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                color="primary"
                size="small"
                // className={this.props.submit}
                onClick={clickSubmit}
              >
                Login
              </Button>

              <Link href="/forgot-password" variant="body2">
                Forgot Password ?
              </Link>
            </Grid>
          </Grid>
        </form>
        <Divider style={{ margin: "10px 0px" }} />
        {/* <SocialLogin /> */}
      </div>
    </Container>
  );
};

export default Signin;
