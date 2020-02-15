import React, { Component } from "react";
import axios from "axios";
import Test from "./Test";

class TestListCard extends Component {
	state = {
		news: [],
		loading: false
	};

	async componentDidMount() {
		this.setState({ loading: true });
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/testnews`);
		this.setState({ news: res.data.sources, loading: false });
	}

	render() {
		return (
			<React.Fragment>
				<Test loading={this.state.loading} news={this.state.news} />
			</React.Fragment>
		);
	}
}

export default TestListCard;
