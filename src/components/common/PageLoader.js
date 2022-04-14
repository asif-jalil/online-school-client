import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Spinner from "react-bootstrap/Spinner";

const PageLoader = ({ type = "normal", className }) => (
	<div
		className={classNames(
			"d-flex justify-content-center align-items-center",
			{ "min-vh-100": type === "full" },
			{ "py-5": type === "normal" },
			className
		)}
	>
		<Spinner animation="border" variant="primary" />
	</div>
);

export default PageLoader;
