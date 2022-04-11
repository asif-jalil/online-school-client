import React, { createContext, useMemo, useReducer } from "react";
import appReducer from "reducers/appReducer";

const AppContext = createContext();

const initialState = {
	loading: true,
	user: null,
};

const AppProvider = props => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	const value = useMemo(() => [state, dispatch], [state]);

	return <AppContext.Provider value={value} {...props} />;
};

export { AppContext, AppProvider };