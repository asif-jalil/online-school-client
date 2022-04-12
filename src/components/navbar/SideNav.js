import { SIGN_OUT } from "actionTypes/appActionTypes";
import classNames from "classnames";
import useAppDispatch from "hooks/useAppDispatch";
import useUser from "hooks/useUser";
import React, { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import authTokenStorage from "utils/authTokenStorage";
import { ADMIN, STUDENT, TEACHER } from "utils/role.const";

const routes = [
	{
		label: "Home",
		to: "/",
    icon: "fas fa-home",
    permission: [ADMIN, TEACHER, STUDENT]
	},
	{
		label: "Profile",
		to: "/profile",
    icon: "fas fa-user",
    permission: [ADMIN, TEACHER, STUDENT]
	},
	{
		label: "Teachers",
		to: "/management/teachers",
		icon: "fas fa-user-tie",
		permission: [ADMIN]
	},
	{
		label: "Students",
		to: "/management/students",
		icon: "fas fa-user-graduate",
		permission: [ADMIN]
	}
];

const SideNav = () => {
	const [isSidebarActive, setIsSidebarActive] = useState(false);
	const user = useUser();
	const dispatch = useAppDispatch();

	const handleLogout = e => {
		e.preventDefault();

		authTokenStorage.removeToken();
		dispatch({
			type: SIGN_OUT
		});
	};

	if (user) {
		return (
			<div className="scrollbar">
				<div
					className={classNames("sidebar", {
						active: isSidebarActive
					})}
				>
					<Button
						onClick={() => setIsSidebarActive(!isSidebarActive)}
						className="sidebar-toggle d-block d-xl-none px-3 py-2"
						variant="danger"
					>
						{isSidebarActive ? (
							<i className="far fa-times"></i>
						) : (
							<i className="fas fa-bars"></i>
						)}
					</Button>
					<h4 className="text-white mb-5 mt-4 ps-4 pe-3">Hello, {user.name}</h4>
					<Nav className="flex-column px-4 ms-n3">
						{routes.map(
							route =>
								route.permission?.includes(user.role) && (
									<NavLink
										key={route.label}
										to={route.to}
										className={({ isActive }) =>
											classNames("nav-link mb-3", {
												"text-secondary": isActive
											})
										}
									>
										<i className={`me-2 ${route.icon}`}></i> {route.label}
									</NavLink>
								)
						)}
						<Button variant="danger" onClick={handleLogout} className="mt-5">
							<i className="me-2 fas fa-sign-out"></i> Logout
						</Button>
					</Nav>
				</div>
			</div>
		);
	}
};

export default SideNav;
