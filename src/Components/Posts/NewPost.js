import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { create } from "./ApiPost";

import NativeSelect from "@material-ui/core/NativeSelect";
import axios from "axios";

import { AuthContext } from "../../context/Auth/AuthState";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const fetchCategory = async () => {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/categories`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.error;
    });
};

const initialValues = {
  title: "",
  body: "",
  photo: "",
  error: "",
  fileSize: 0,
  loading: false,
  redirectToProfile: false,
  category: "Select Category",
  catList: [],
};

function NewPost() {
  const classes = useStyles();
  const { isAuthenticated, user, token } = useContext(AuthContext);
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    // console.log(`${name} : ${value}`);
    setValues({
      ...values,
      [name]: value,
      fileSize,
    });
  };

  useEffect(() => {
    fetchCategory().then((data) => {
      setValues({ ...values, catList: [...data] });
    });
  }, []);

  const isValid = () => {
    const { title, body, fileSize, category } = values;
    if (fileSize > 100000) {
      setValues({
        ...values,
        error: "File size should be less than 100kb",
        loading: false,
      });

      return false;
    }

    if (title === "" || body === "" || category === "Select Category") {
      setValues({
        ...values,
        error: "All Fields are required",
        loading: false,
      });

      return false;
    }
    return true;
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    if (isValid()) {
      setValues({ ...values, loading: true });
      let blogData = new FormData();
      blogData.append("title", values.title);
      blogData.append("body", values.body);
      blogData.append("photo", values.photo);
      blogData.append("category", values.category);

      create(user._id, token, blogData).then((response) => {
        console.log(response.message);
        if (response.message === "success") {
          setValues({
            ...values,
            loading: false,
            title: "",
            body: "",
            category: "",
            catList: [],
            redirectToProfile: true,
          });
        }
      });
    }
  };

  return values.redirectToProfile ? (
    <Redirect to={`/user/${user._id}`} />
  ) : (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Typography
            variant="h6"
            gutterBottom
            color="primary"
            align="center"
            // style={{ marginTop: 30 }}
          >
            WRITE YOUR AWESOME BLOG
          </Typography>
          <div style={{ display: values.error ? "" : "none" }}>
            <InputLabel style={{ color: "red" }}>{values.error}</InputLabel>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <div>
              <TextField
                required
                id="title"
                name="title"
                label="Blog Title"
                fullWidth
                autoComplete="blog"
                onChange={handleChange}
              />
            </div>
            <div style={{ marginTop: 8, marginBottom: 8 }}>
              <FormControl>
                {/* <InputLabel shrink htmlFor="category-native-label-placeholder">
									Select Category *
								</InputLabel> */}
                <NativeSelect
                  // value={values.category}
                  onChange={handleChange}
                  inputProps={{
                    name: "category",
                    id: "category-native-label-placeholder",
                  }}
                  fullWidth
                >
                  <option value="">Select Category</option>
                  {values.catList.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </div>
            <div style={{ marginBottom: 32 }}>
              <InputLabel id="photo">Blog Image</InputLabel>
              <Input
                type="file"
                id="photo"
                name="photo"
                fullWidth
                onChange={handleChange}
                type="file"
                accept="image/*"
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            {" "}
            <TextField
              required
              id="body"
              name="body"
              label="Blog Content"
              autoComplete="Write"
              multiline={true}
              fullWidth
              rows={20}
              rowsMax={50}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" onClick={clickSubmit}>
              Create Post
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default NewPost;
