import React from "react";
import classNames from "classnames";
import { Button, Spinner } from "react-bootstrap";

const LoadingButton = ({
	loading,
	disabled = false,
	className,
	children,
	...rest
}) => (
	<Button
		className={classNames(
			"d-inline-flex align-items-center justify-content-center",
			className
		)}
		disabled={loading || disabled}
		{...rest}
	>
		{loading && <Spinner animation="border" size="sm" />}
		<span className={classNames({ "ms-1": loading })}>{children}</span>
	</Button>
);

export default LoadingButton;
