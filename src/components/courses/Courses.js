import React from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import CourseGallery from "./CourseGallery";
import EnrolledCourse from "./EnrolledCourse";

const getRoutes = url => [
	{
		route: Route,
		path: url,
		component: CourseGallery,
		exact: true
	},
	{
		route: Route,
		path: `${url}/enrolled`,
		component: EnrolledCourse,
		exact: true
	},
	{
		route: Redirect,
		to: url
	}
];

const Courses = () => {
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

export default Courses;
