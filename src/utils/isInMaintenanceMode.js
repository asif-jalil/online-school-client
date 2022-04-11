const isInMaintenanceMode = () => {
	return process.env.REACT_APP_MODE === "maintenance";
};

export default isInMaintenanceMode;