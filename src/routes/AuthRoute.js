import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import useApp from "hooks/useApp";
import isInMaintenanceMode from "utils/isInMaintenanceMode";
import Layout from "components/layout/Layout";

const AuthRoute = ({
	layout: CustomLayout,
	component: Component,
	render,
	permission,
	redirectTo,
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
				if (!app.user) {
					return (
						<Redirect
							to={{
								pathname: "/auth/login",
								state: { from: props.location }
							}}
						/>
					);
				}

				if (permission && !permission.includes(app.user.role)) {
					return <Redirect to={redirectTo || "/"} />;
				}

				let content = null;

				if (Component) {
					content = <Component {...props} user={app.user} />;
				} else if (render) {
					content = render({
						...props,
						user: app.user
					});
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

AuthRoute.propTypes = {
	layout: PropTypes.any,
	component: PropTypes.any,
	render: PropTypes.any,
	permission: PropTypes.array,
	redirectTo: PropTypes.string
};

export default AuthRoute;
