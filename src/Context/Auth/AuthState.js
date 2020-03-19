import React, { useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

const initialState = {
	isAuthenticated: false,
	user: null,
	token: null,
	loading: null,
	error: null,
	message: null
};

const reducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			localStorage.setItem("token", JSON.stringify(action.payload.token));
			localStorage.setItem("user", JSON.stringify(action.payload.user));
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
				token: action.payload.token
			};

		case "LOGIN_FAILED":
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				user: null,
				token: null,
				error: action.payload
			};
		case "LOGOUT":
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				user: null,
				error: action.payload,
				token: null
			};
		default:
			return state;
	}
};

const AuthState = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const [data, setData] = useState(initialState);

	React.useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user") || null);
		const token = JSON.parse(localStorage.getItem("token") || null);

		if (user && token) {
			dispatch({
				type: "LOGIN",
				payload: {
					user,
					token
				}
			});
		}
	}, []);

	const Signin = async user => {
		const config = {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		};
		try {
			console.log(config);
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/signin`,

				user,
				config
			);

			dispatch({
				type: "LOGIN",
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: "LOGIN_FAILED",
				payload: err.response.data.error
			});
		}
	};

	const Signout = () => {
		try {
			const res = axios.get(`${process.env.REACT_APP_API_URL}/signout`);

			dispatch({
				type: "LOGOUT",
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: "LOGIN_FAILED",
				payload: "Logout Failed"
			});
		}
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				error: state.error,
				message: state.message,
				Signin,
				Signout
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthState;
