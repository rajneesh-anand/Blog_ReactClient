import React from "react";
import CardDetails from "./CardDetails";
import NoData from "../Layouts/NoData";
import Grid from "@material-ui/core/Grid";

const CardList = (props) => {
  return props.posts.length > 0 ? (
    <Grid container justify="center">
      {props.posts.map((post) => (
        <CardDetails key={post._id} post={post} />
      ))}
    </Grid>
  ) : (
    <NoData />
  );
};

export default CardList;
