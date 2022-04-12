import classNames from "classnames";
import SideNav from "components/navbar/SideNav";
import TopNav from "components/navbar/TopNav";
import useUser from "hooks/useUser";
import React from "react";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
	const user = useUser();

	return (
		<>
			<TopNav />
			<SideNav />
			<div className={classNames("content", { "ms-0": !user })}>
				<Container fluid>{children}</Container>
			</div>
		</>
	);
};

export default Layout;
