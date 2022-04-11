import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import useApp from "hooks/useApp";
import isInMaintenanceMode from "utils/isInMaintenanceMode";

const GuestRoute = ({
	layout: Layout,
	component: Component,
	render,
	...rest
}) => {
	const [app] = useApp();

	if (isInMaintenanceMode()) {
		return <Redirect to="/pages/maintenance" />;
	}

	return (
		<Route
			{...rest}
			render={props => {
				const { from } = props.location.state || { from: { pathname: "/" } };

				if (app.user) {
					return <Redirect to={from} />;
				}

				let content = null;

				if (Component) {
					content = <Component {...props} />;
				} else if (render) {
					content = render(props);
				} else {
					throw new Error("No component/render prop found");
				}

				if (Layout) {
					return <Layout>{content}</Layout>;
				}

				return content;
			}}
		/>
	);
};

GuestRoute.propTypes = {
	layout: PropTypes.any,
	component: PropTypes.any,
	render: PropTypes.any
};

export default GuestRoute;
