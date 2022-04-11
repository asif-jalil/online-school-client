import axios from "axios";
import authTokenStorage from "./authTokenStorage";

const attachAuthToken = config => {
	const authToken = authTokenStorage.getToken();
	if (authToken) {
		config.headers.common["Authorization"] = authToken;
	}
	return config;
};

const responseSideEffect = error => {
	const { code } = error.response.data;
	if (["Unauthorized", "Unauthenticated"].includes(code)) {
		window.location.href = "/";
	}
	return Promise.reject(error);
};

const API = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

API.interceptors.request.use(attachAuthToken);
API.interceptors.response.use(response => response, responseSideEffect);

export default API;