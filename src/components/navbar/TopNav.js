import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import useUser from "hooks/useUser";

const TopNav = () => {
	const user = useUser();

	if (!user) {
		return (
			<Navbar bg="primary" variant="dark" expand="lg">
				<Container fluid>
					<Navbar.Brand as={Link} to="/">
						Online School
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link as={Link} to="/auth/login">
								Login
							</Nav.Link>
							<Nav.Link as={Link} to="/auth/signup">
								Sign Up
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}

	return;
};

export default TopNav;
