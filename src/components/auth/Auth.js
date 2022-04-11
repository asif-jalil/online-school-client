import React from "react";
import { Col, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

const getRoutes = url => [
	{
		route: Route,
		path: `${url}/login`,
		component: Login,
		exact: true
	},
	{
		route: Route,
		path: `${url}/signup`,
		component: SignUp,
		exact: true
	},
	{
		route: Redirect,
		to: `${url}/login`
	}
];

const Auth = () => {
	const { url } = useRouteMatch();
	const routes = getRoutes(url);

	return (
		<Row className="justify-content-center py-5">
			<Col sm={10} md={8} lg={4} xl={3}>
				<Switch>
					{routes.map((route, i) => {
						const { route: Route, ...rest } = route;
						return <Route key={i} {...rest} />;
					})}
				</Switch>
			</Col>
		</Row>
	);
};

export default Auth;
