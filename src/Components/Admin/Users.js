import React, { Component, Fragment } from "react";
import { list } from "../User/apiUser";
import DefaultProfile from "../Images/avatar.jpg";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
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
		<Fragment>
			{users.map((user, i) => (
				<Grid item key={i}>
					<Avatar
						alt={user.name}
						src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
						size="large"
					/>

					<div>
						<h5>{user.name}</h5>
						{/* <p>{user.email}</p> */}
						<Link to={`/user/${user._id}`}>View Profile</Link>
					</div>
				</Grid>
			))}
		</Fragment>
	);

	render() {
		const { users } = this.state;
		return <>{this.renderUsers(users)}</>;
	}
}

export default Users;
