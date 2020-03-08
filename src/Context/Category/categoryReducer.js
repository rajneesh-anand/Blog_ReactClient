import {
	ADD_CATEGORY,
	UPDATE_CATEGORY,
	DELETE_CATEGORY,
	CLEAR_CURRENT,
	GET_CATEGORY,
	CLEAR_CATEGORY,
	ERROR_CATEGORY,
	SET_CURRENT
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case GET_CATEGORY:
			return {
				...state,
				contacts: action.payload,
				loading: false
			};
		case ADD_CATEGORY:
			return {
				...state,
				contacts: [action.payload, ...state.contacts],
				loading: false
			};
		case UPDATE_CATEGORY:
			return {
				...state,
				contacts: state.contacts.map(contact =>
					contact._id === action.payload._id ? action.payload : contact
				),
				loading: false
			};
		case DELETE_CATEGORY:
			return {
				...state,
				contacts: state.contacts.filter(
					contact => contact._id !== action.payload
				),
				loading: false
			};
		case CLEAR_CATEGORY:
			return {
				...state,
				contacts: null,
				filtered: null,
				error: null,
				current: null
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case ERROR_CATEGORY:
			return {
				...state,
				error: action.payload
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			};

		default:
			return state;
	}
};
