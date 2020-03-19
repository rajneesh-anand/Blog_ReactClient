import React, { useEffect, useState } from "react";
import axios from "axios";

const initialState = {
	bodyFirst: "",
	bodySecond: "",
	title: "",
	page: 1,
	status: "active",
	isFetching: false,
	hasError: false,
	likeFirstStatus: "",
	likeSecondStatus: false,
	unlikeSecondStatus: false,
	likeSecondStatus: false,
	likesFirst: [],
	unlikesFirst: [],
	likesSecond: [],
	unlikesSecond: [],
	redirectToHome: false,
	redirectToSignin: false,
	comments: [],
	quizId: ""
};

export const QuizContext = React.createContext(initialState);

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_QUIZ_REQUEST":
			return {
				...state,
				isFetching: true,
				hasError: false
			};
		case "FETCH_QUIZ_SUCCESS_SIGNIN":
			return {
				...state,
				isFetching: false,
				quiz: action.payload,
				likesFirst: action.payload.likesFirst,
				likeFirstStatus: true
			};

		case "FETCH_QUIZ":
			return {
				...state,
				isFetching: false,
				bodyFirst: action.payload.bodyFirst,
				bodySecond: action.payload.bodySecond,
				title: action.payload.title,
				comments: action.payload.comments,
				likesFirst: action.payload.likesFirst,
				likesSecond: action.payload.likesSecond,
				unlikesFirst: action.payload.unlikesFirst,
				unlikesSecond: action.payload.unlikesSecond,
				quizId: action.payload._id
			};
		case "FETCH_FAILED":
			return {
				...state,
				hasError: true,
				isFetching: false
			};

		case "SET_REDIRECT_SIGNIN":
			return {
				...state,
				isFetching: false,
				redirectToSignin: true
			};

		case "SET_LIKE_UNLIKE":
			return {
				...state,
				isFetching: false,
				likesFirst: action.payload.likesFirst
				// likeFirstStatus: !likeFirstStatus
			};

		case "RESET_DATA":
			return {
				...state,
				likesFirst: action.payload.likesFirst,
				likesSecond: action.payload.likesSecond,
				unlikesFirst: action.payload.unlikesFirst,
				unlikesSecond: action.payload.unlikesSecond,
				comments: action.payload.comments
			};

		default:
			return state;
	}
};

const QuizState = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const status = state.status;
	const page = state.page;

	async function resetData(status, page) {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/quiz/${status}/?page=${page}`,
				{
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					}
				}
			);

			dispatch({
				type: "RESET_DATA",
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: "FETCH_FAILED",
				payload: err.response.data.error
			});
		}
	}

	useEffect(() => {
		let isCancelled = false;
		if (!isCancelled) {
			dispatch({
				type: "FETCH_QUIZ_REQUEST"
			});
		}
		async function fetchData(status, page) {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_API_URL}/quiz/${status}/?page=${page}`,
					{
						method: "GET",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json"
						}
					}
				);

				dispatch({
					type: "FETCH_QUIZ",
					payload: res.data
				});
			} catch (err) {
				dispatch({
					type: "FETCH_FAILED",
					payload: err.response.data.error
				});
			}
		}
		fetchData(status, page);

		return () => {
			isCancelled = true;
		};
	}, []);

	return (
		<QuizContext.Provider
			value={{
				bodyFirst: state.bodyFirst,
				bodySecond: state.bodySecond,
				title: state.title,
				comments: state.comments,
				likesFirst: state.likesFirst,
				likesSecond: state.likesSecond,
				unlikesFirst: state.unlikesFirst,
				unlikesSecond: state.unlikesSecond,
				quizId: state.quizId,
				resetData
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

export default QuizState;
