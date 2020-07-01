import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../Styles/custom.css";

export default function NoData() {
  return (
    <div className="centered">
      <Typography color="textSecondary">
        Sorry ! We didn't find any post
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="small"
        component={Link}
        to="/post/create"
      >
        Publish your own post
      </Button>
    </div>
  );
}
