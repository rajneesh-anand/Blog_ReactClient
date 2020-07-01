import React, { useState, useEffect } from "react";
import axios from "axios";
import Progress from "../Layouts/Progress";
import CardList from "./CardList";
import "../Styles/custom.css";

const fetchPosts = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/posts/category/philosophy`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
};

function Philosophy(props) {
  const [data, setData] = useState({ loading: true, records: null });

  useEffect(() => {
    fetchPosts().then((results) => {
      setData({ loading: false, records: results });
    });
    props.history.push("/posts/philosophy");
  }, []);

  return data.loading ? (
    <div className="centered">
      <Progress />
    </div>
  ) : (
    <CardList posts={data.records} />
  );
}

export default Philosophy;
