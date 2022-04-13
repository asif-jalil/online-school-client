import React from "react";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { Route } from "react-router-dom";
import Students from "./Students";
import Teachers from "./Teachers";

const getRoutes = url => [
	{
		route: Route,
		path: `${url}/teachers`,
		component: Teachers,
		exact: true
	},
	{
		route: Route,
		path: `${url}/students`,
		component: Students,
		exact: true
	},
	{
		route: Redirect,
		to: "/"
	}
];

const Management = () => {
	const { url } = useRouteMatch();
	const routes = getRoutes(url);

	return (
    <>
			<Switch>
				{routes.map((route, i) => {
					const { route: Route, ...rest } = route;
					return <Route key={i} {...rest} />;
				})}
			</Switch>
		</>
	);
};

export default Management;
