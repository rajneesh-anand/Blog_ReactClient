import React, { Component } from "react";
import { list } from "../User/apiUser";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

class Users extends Component {
	constructor() {
		super();
		this.state = {
			users: []
		};
	}

	componentDidMount() {
		list().then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({ users: data });
			}
		});
	}

	renderUsers = users => (
		<>
			{users.map((user, i) => (
				<div key={i} align="center" style={{ margin: "0px 16px" }}>
					<Avatar
						alt={user.name}
						src={
							`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`
								? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}`
								: ""
						}
						size="large"
					/>

					<div>
						<h5>{user.name}</h5>
						{/* <p>{user.email}</p> */}
						<Link to={`/user/${user._id}`}>View</Link>
					</div>
				</div>
			))}
		</>
	);

	render() {
		const { users } = this.state;
		return <>{this.renderUsers(users)}</>;
	}
}

export default Users;
