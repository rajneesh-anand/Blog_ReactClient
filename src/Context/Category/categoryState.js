import React, { useReducer } from "react";
import axios from "axios";
import categoryContext from "./categoryContext";
import categoryReducer from "./categoryReducer";
import {
	ADD_CATEGORY,
	UPDATE_CATEGORY,
	DELETE_CATEGORY,
	CLEAR_CURRENT,
	GET_CATEGORY,
	CLEAR_CATEGORY,
	ERROR_CATEGORY,
	SET_CURRENT,
	RESET
} from "../types";

const CategoryState = props => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null
	};
	const [state, dispatch] = useReducer(categoryReducer, initialState);
	// Get Contacts
	const getCategories = async () => {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/categories`
			);

			dispatch({
				type: GET_CATEGORY,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: ERROR_CATEGORY,
				payload: err.response.data.error
			});
		}
	};

	// Add Contact
	const addCategory = async (contact, token) => {
		const config = {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		};

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/category`,
				contact,
				config
			);

			dispatch({
				type: ADD_CATEGORY,
				payload: res.data
			});
		} catch (err) {
			console.log(err.response.data.error);
			console.log(initialState.contacts);
			dispatch({
				type: ERROR_CATEGORY,
				payload: err.response.data.error
			});
		}
	};

	// Delete Contact
	const deleteContact = async id => {
		try {
			await axios.delete(`/api/contacts/${id}`);

			dispatch({
				type: DELETE_CATEGORY,
				payload: id
			});
		} catch (err) {
			dispatch({
				type: ERROR_CATEGORY,
				payload: err.response.msg
			});
		}
	};

	// Update Contact
	const updateContact = async contact => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		try {
			const res = await axios.put(
				`/api/contacts/${contact._id}`,
				contact,
				config
			);

			dispatch({
				type: UPDATE_CATEGORY,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: ERROR_CATEGORY,
				payload: err.response.msg
			});
		}
	};

	// Clear Contacts
	const clearContacts = () => {
		dispatch({ type: CLEAR_CATEGORY });
	};

	// Set Current Contact
	const setCurrent = contact => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	// Clear Current Contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//   // Filter Contacts
	//   const filterContacts = text => {
	//     dispatch({ type: FILTER_CONTACTS, payload: text });
	//   };

	//   // Clear Filter
	//   const clearFilter = () => {
	//     dispatch({ type: CLEAR_FILTER });
	//   };

	return (
		<categoryContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addCategory,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				// filterContacts,
				// clearFilter,
				getCategories,
				clearContacts
			}}
		>
			{props.children}
		</categoryContext.Provider>
	);
};

export default CategoryState;
