// import React, { useEffect } from "react";
// import { quizByStatus } from "./APITravel";
// import { JssProvider } from "react-jss";
// // import { createGenerateClassName } from "@material-ui/core/styles";
// // import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import TravelCard from "./TravelCard";
// import { isAuthenticated } from "../Auth";
// import Testing from "./Testing";

// // const muiBaseTheme = createMuiTheme();

// // const generateClassName = createGenerateClassName({
// // 	dangerouslyUseGlobalCSS: true
// // });

// const initialState = {
// 	quiz: [],
// 	page: 1,
// 	status: "active",
// 	isFetching: false,
// 	hasError: false,
// 	likeFirstStatus: false,
// 	likeSecondStatus: false,
// 	unlikeSecondStatus: false,
// 	likeSecondStatus: false,
// 	likesFirst: 0,
// 	unlikesFirst: 0,
// 	likesSecond: 0,
// 	unlikesSecond: 0,
// 	redirectToHome: false,
// 	redirectToSignin: false,
// 	comments: []
// };

// export const QuizContext = React.createContext(initialState);

// const reducer = (state, action) => {
// 	switch (action.type) {
// 		case "FETCH_QUIZ_REQUEST":
// 			return {
// 				...state,
// 				isFetching: true,
// 				hasError: false
// 			};
// 		case "FETCH_QUIZ_SUCCESS_SIGNIN":
// 			return {
// 				...state,
// 				isFetching: false,
// 				quiz: action.payload,
// 				likesFirst: action.payload.likesFirst,
// 				likeFirstStatus: true
// 			};

// 		case "FETCH_QUIZ_SUCCESS":
// 			return {
// 				...state,
// 				isFetching: false,
// 				likesFirst: action.payload.likesFirst,
// 				likeFirstStatus: false
// 			};
// 		case "FETCH_QUIZ_FAILURE":
// 			return {
// 				...state,
// 				hasError: true,
// 				isFetching: false
// 			};

// 		case "SET_REDIRECT_SIGNIN":
// 			return {
// 				...state,
// 				isFetching: false,
// 				redirectToSignin: true
// 			};

// 		case "SET_LIKE_UNLIKE":
// 			return {
// 				...state,
// 				isFetching: false,
// 				likesFirst: action.payload.likesFirst
// 				// likeFirstStatus: !likeFirstStatus
// 			};

// 		case "SET_DATA":
// 			return {
// 				...state,
// 				likeFirstStatus: true
// 			};

// 		default:
// 			return state;
// 	}
// };

// const CounterProvider = ({ children }) => {
// 	const [state, dispatch] = React.useReducer(reducer, initialState);

// 	useEffect(() => {
// 		let isCancelled = false;
// 		if (!isCancelled) {
// 			dispatch({
// 				type: "FETCH_QUIZ_REQUEST"
// 			});
// 		}

// 		if (isAuthenticated()) {
// 			dispatch({
// 				type: "SET_DATA"
// 			});
// 		}

// 		return () => {
// 			isCancelled = true;
// 		};
// 	}, []);

// 	return (
// 		// <JssProvider generateClassName={generateClassName}>
// 		// 	<MuiThemeProvider
// 		// 		theme={createMuiTheme({
// 		// 			typography: {
// 		// 				useNextVariants: true
// 		// 			},
// 		// 			overrides: TravelCard.getTheme(muiBaseTheme)
// 		// 		})}
// 		// 	>
// 		<QuizContext.Provider
// 			value={{
// 				state,
// 				dispatch
// 			}}
// 		>
// 			<Testing />
// 		</QuizContext.Provider>
// 		// 	</MuiThemeProvider>
// 		// </JssProvider>
// 	);
// };

// export default CounterProvider;
