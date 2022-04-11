const generateURL = location => {
	return [location?.pathname, location?.search, location?.hash].join("");
};

export default generateURL;