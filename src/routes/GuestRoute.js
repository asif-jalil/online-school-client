import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import useApp from "hooks/useApp";
import isInMaintenanceMode from "utils/isInMaintenanceMode";
import Layout from "components/layout/Layout";

const GuestRoute = ({
	layout: CustomLayout,
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

				if (CustomLayout) {
					return <CustomLayout>{content}</CustomLayout>;
				}

				return <Layout>{content}</Layout>;
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
