import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";
import { AuthContext } from "../../Context/Auth/AuthState";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = React.useContext(AuthContext);
	// props means components passed down to this pricate route component
	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/signin",
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
