const tokenName = "auth-token";

const authTokenStorage = {
	getToken() {
		return localStorage.getItem(tokenName);
	},
	setToken(token) {
		return localStorage.setItem(tokenName, token);
	},
	removeToken() {
		return localStorage.removeItem(tokenName);
	}
};

export default authTokenStorage;