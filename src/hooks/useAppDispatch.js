import { AppContext } from "context/AppContext";
import { useContext } from "react";

const useAppDispatch = () => {
	/* eslint-disable no-unused-vars */
	const [app, dispatch] = useContext(AppContext);

	if (!dispatch) {
		throw new Error("useApp must be used within a AppProvider");
	}

	return dispatch;
};

export default useAppDispatch;
