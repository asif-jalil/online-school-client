import React from "react";

const CloseButton = ({ closeToast }) => (
	<i className="fas fa-times" onClick={closeToast}></i>
);

export default CloseButton;
