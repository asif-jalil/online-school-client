import {
	APP_LOADED,
	SIGN_IN,
	SIGN_UP,
	SIGN_OUT,
	UPDATE_USER
} from "../actionTypes/appActionTypes";

const appReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case APP_LOADED: {
			return {
				...state,
				loading: false,
				user: payload.user || null,
			};
    }
      case SIGN_IN: {
			return {
				...state,
				user: payload.user,
			};
		}
		case SIGN_UP: {
			return {
				...state,
				user: payload.user,
			};
		}
		case SIGN_OUT: {
			return {
				...state,
				user: null,
			};
		}
		case UPDATE_USER: {
			return { ...state, user: payload.user };
		}
		default: {
			throw new Error(`Unsupported action type: ${type}`);
		}
	}
};

export default appReducer;
