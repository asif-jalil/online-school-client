import { APP_LOADED } from "actionTypes/appActionTypes";
import Auth from "components/auth/Auth";
import Dashboard from "components/dashboard/Dashboard";
import Profile from "components/profile/Profile";
import useApp from "hooks/useApp";
import usePrevious from "hooks/usePrevious";
import { useCallback, useEffect } from "react";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthRoute from "routes/AuthRoute";
import GuestRoute from "routes/GuestRoute";
import API from "utils/API";
import authTokenStorage from "utils/authTokenStorage";
import generateURL from "utils/generateURL";

const routes = [
	{
		route: AuthRoute,
		path: "/",
		component: Dashboard,
		exact: true
	},
	{
		route: AuthRoute,
		path: "/profile",
		component: Profile,
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

	const loadAuthUser = useCallback(() => {
		API.get("/auth/user")
			.then(res => res.data)
			.then(res => {
				if (res && res.user) {
					const { brands, ...user } = res.user;
					dispatch({
						type: APP_LOADED,
						payload: { user, brands }
					});
				} else {
					authTokenStorage.removeToken();
					dispatch({
						type: APP_LOADED,
						payload: {}
					});
				}
			})
			.catch(() => {
				authTokenStorage.removeToken();
				dispatch({
					type: APP_LOADED,
					payload: {}
				});
			});
	}, [dispatch]);

	// load auth user
	useEffect(loadAuthUser, [loadAuthUser]);

	useEffect(() => {
		const prevUrl = generateURL(prevLocation);
		const url = generateURL(location);
		if (prevUrl !== url) {
			window.scrollTo(0, 0);
		}
	}, [location, prevLocation]);
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
}

export default App;
