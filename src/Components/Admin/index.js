import React, { useEffect } from "react";
import CategoryList from "./CategoryList";
import Users from "./Users";
import { isAuthenticated } from "../Auth";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AddCategoryForm from "./AddCategoryForm";

export const AuthContext = React.createContext();

const initialState = {
	categories: [],
	isFetching: false,
	hasError: false,
	isCategorySubmitting: false,
	categoryHasError: false
};

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_CATEGORY_REQUEST":
			return {
				...state,
				isFetching: true,
				hasError: false
			};
		case "FETCH_CATEGORY_SUCCESS":
			return {
				...state,
				isFetching: false,
				categories: action.payload
			};
		case "FETCH_CATEGORY_FAILURE":
			return {
				...state,
				hasError: true,
				isFetching: false
			};
		case "ADD_CATEGORY_REQUEST":
			return {
				...state,
				isCategorySubmitting: true,
				categoryHasError: false
			};
		case "ADD_CATEGORY_SUCCESS":
			return {
				...state,
				isCategorySubmitting: false,
				categories: [...state.categories, action.payload]
			};
		case "ADD_CATEGORY_FAILURE":
			return {
				...state,
				isCategorySubmitting: false,
				categoryHasError: true
			};
		default:
			return state;
	}
};

const Admin = () => {
	const [redirectToHome, setRedirectToHome] = React.useState(false);
	const [state, dispatch] = React.useReducer(reducer, initialState);

	useEffect(() => {
		let isCancelled = false;

		if (isAuthenticated().user.role !== "admin") {
			setRedirectToHome(true);
		}
		if (!isCancelled) {
			dispatch({
				type: "FETCH_CATEGORY_REQUEST"
			});
		}

		fetch(`${process.env.REACT_APP_API_URL}/categories`)
			.then(res => {
				return res.json();
			})

			.then(resJson => {
				console.log(resJson);
				if (!isCancelled) {
					dispatch({
						type: "FETCH_CATEGORY_SUCCESS",
						payload: resJson
					});
				}
			})
			.catch(error => {
				console.log(error);
				if (!isCancelled) {
					dispatch({
						type: "FETCH_CATEGORY_FAILURE"
					});
				}
			});

		return () => {
			isCancelled = true;
		};
	}, []);

	if (redirectToHome) {
		return <Redirect to="/" />;
	}

	return (
		<React.Fragment>
			<Grid container item sm={6} xs={12}>
				<Users />
			</Grid>
			<Grid container item sm={6} xs={12} justify="space-between">
				<div align="center">
					<h4>Category List</h4>
					{state.isFetching ? (
						<span>LOADING...</span>
					) : state.hasError ? (
						<span>AN ERROR HAS OCCURED</span>
					) : (
						<>
							{state.categories.length > 0 &&
								state.categories.map(category => (
									<CategoryList key={category._id} category={category} />
								))}
						</>
					)}
				</div>

				<AuthContext.Provider
					value={{
						state,
						dispatch
					}}
				>
					<AddCategoryForm />
				</AuthContext.Provider>
			</Grid>
		</React.Fragment>
	);
};

export default Admin;
