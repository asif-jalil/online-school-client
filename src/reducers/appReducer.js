import {
	APP_LOADED,
	SIGN_IN,
	SIGN_UP,
	SIGN_OUT,
	UPDATE_USER,
	CREATE_COURSE,
	CREATE_ENROLLMENT
} from "../actionTypes/appActionTypes";

const appReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case APP_LOADED: {
			return {
				...state,
				user: payload.user || null,
				courses: payload.courses || [],
				enrolledCourses: payload.enrolledCourses || []
			};
		}
		case SIGN_IN: {
			return {
				...state,
				user: payload.user,
				courses: payload.courses,
				enrolledCourses: payload.enrolledCourses
			};
		}
		case SIGN_UP: {
			return {
				...state,
				user: payload.user,
				courses: payload.courses,
				enrolledCourses: payload.enrolledCourses
			};
		}
		case SIGN_OUT: {
			return {
				...state,
				user: null,
				courses: [],
				enrolledCourses: []
			};
		}
		case UPDATE_USER: {
			return { ...state, user: payload.user };
		}
		case CREATE_COURSE: {
			return { ...state, courses: [...state.courses, payload.course] };
		}
		case CREATE_ENROLLMENT: {
			return {
				...state,
				enrolledCourses: [...state.enrolledCourses, payload.enrolledCourse]
			};
		}
		default: {
			throw new Error(`Unsupported action type: ${type}`);
		}
	}
};

export default appReducer;
