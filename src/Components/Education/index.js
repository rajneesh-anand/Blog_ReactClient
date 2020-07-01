import React, { useState, useEffect } from "react";
import Axios from "axios";
import Progress from "../Layouts/Progress";
import EduList from "./EduList";
import { listByCategory } from "../Posts/ApiPost";

// class Design extends Component {
// 	state = {
// 		posts: [],
// 		loading: false,
// 		page: 1,
// 		category: "news"
// 	};

// 	loadPosts = page => {
// 		listByCategory(this.state.category, page).then(data => {
// 			if (data.error) {
// 				console.log(data.error);
// 			} else {
// 				this.setState({ posts: data });
// 			}
// 		});
// 	};

// 	componentDidMount() {
// 		this.loadPosts(this.state.page);
// 	}

// 	loadMore = number => {
// 		this.setState({ page: this.state.page + number });
// 		this.loadPosts(this.state.page + number);
// 	};

// 	loadLess = number => {
// 		this.setState({ page: this.state.page - number });
// 		this.loadPosts(this.state.page - number);
// 	};

// 	render() {
// 		const { posts, page, loading } = this.state;
// 		return (
// 			<React.Fragment>
// 				<DesignList posts={posts} />

// 				{page > 1 ? (
// 					<Button onClick={() => this.loadLess(1)}>Previous</Button>
// 				) : (
// 					""
// 				)}

// 				{posts.length > 25 ? (
// 					<Button onClick={() => this.loadMore(1)}>Next</Button>
// 				) : (
// 					""
// 				)}
// 			</React.Fragment>
// 		);
// 	}
// }

// export default Design;

const fetchEducationPosts = async () => {
	return await Axios.get(
		`${process.env.REACT_APP_API_URL}/posts/category/education`
	)
		.then((response) => {
			console.log(response.data);
			return response.data;
		})
		.catch((error) => {
			return error.response;
		});
};

function Education(props) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchEducationPosts().then((msg) => {
			setData(msg);
			setLoading(false);
		});
		props.history.push("/posts/education");
	}, []);

	return loading ? (
		<div style={{ textAlign: "center" }}>
			<Progress />
		</div>
	) : (
		<EduList posts={data} />
	);
}

export default Education;
