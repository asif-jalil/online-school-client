import {
	APP_LOADED,
	SIGN_IN,
	SIGN_UP,
	SIGN_OUT,
	UPDATE_USER,
	CREATE_COURSE
} from "../actionTypes/appActionTypes";

const appReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case APP_LOADED: {
			return {
				...state,
				user: payload.user || null,
				courses: payload.courses || []
			};
		}
		case SIGN_IN: {
			return {
				...state,
				user: payload.user,
				courses: payload.courses
			};
		}
		case SIGN_UP: {
			return {
				...state,
				user: payload.user,
				courses: payload.courses
			};
		}
		case SIGN_OUT: {
			return {
				...state,
				user: null,
				courses: []
			};
		}
		case UPDATE_USER: {
			return { ...state, user: payload.user };
		}
		case CREATE_COURSE: {
			return { ...state, courses: [...state.courses, payload.course] };
		}
		default: {
			throw new Error(`Unsupported action type: ${type}`);
		}
	}
};

export default appReducer;
