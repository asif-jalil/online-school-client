import Auth from "components/auth/Auth";
import Dashboard from "components/dashboard/Dashboard";
import TopNav from "components/navbar/TopNav";
import useApp from "hooks/useApp";
import usePrevious from "hooks/usePrevious";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthRoute from "routes/AuthRoute";
import GuestRoute from "routes/GuestRoute";
import generateURL from "utils/generateURL";

const routes = [
  {
		route: AuthRoute,
		path: "/",
		component: Dashboard,
		exact: true
	},
	{
		route: GuestRoute,
		path: "/auth",
		component: Auth
	},
	{
		route: Redirect,
		path: "/login",
		to: "/auth/signin"
	},
	{
		route: Redirect,
		path: "/register",
		to: "/auth/signup"
	}
];

function App() {
	const [app, dispatch] = useApp();
	const location = useLocation();
	const prevLocation = usePrevious(location);

	useEffect(() => {
		const prevUrl = generateURL(prevLocation);
		const url = generateURL(location);
		if (prevUrl !== url) {
			window.scrollTo(0, 0);
		}
	}, [location, prevLocation]);
	return (
		<>
			<TopNav />
			<Container fluid>
				<Switch>
					{routes.map((route, i) => {
						const { route: Route, ...rest } = route;
						return <Route key={i} {...rest} />;
					})}
				</Switch>
			</Container>
		</>
	);
}

export default App;
