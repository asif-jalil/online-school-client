import classNames from "classnames";
import useUser from "hooks/useUser";
import React, { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const routes = [
	{
		label: "Profile",
		to: "/profile",
		icon: "fas fa-user"
	}
];

const SideNav = () => {
	const [isSidebarActive, setIsSidebarActive] = useState(false);
	const user = useUser();

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
						variant="warning"
					>
						{isSidebarActive ? (
							<i className="far fa-times"></i>
						) : (
							<i className="fas fa-bars"></i>
						)}
					</Button>
					<h4 className="text-white mb-5 mt-4 ps-4 pe-3">Hello, Stranger</h4>
					<Nav className="flex-column px-4 ms-n3">
						{routes.map(route => (
							<NavLink
								key={route.label}
								to={route.to}
								className={({ isActive }) =>
									classNames("nav-link mb-3", { "text-secondary": isActive })
								}
							>
								<i className={`me-2 ${route.icon}`}></i> {route.label}
							</NavLink>
						))}
					</Nav>
				</div>
			</div>
		);
	}
};

export default SideNav;
