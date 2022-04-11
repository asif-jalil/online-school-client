import LoadingButton from "components/common/LoadingButton";
import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import API from "utils/API";

const LoginForm = ({ onSignInSuccess }) => {
	const [state, setState] = useState({
		loading: false,
		email: "",
		password: "",
		error: {}
	});

	const handleFormSignIn = e => {
		e.preventDefault();

		setState({ ...state, loading: true });

		API.post("/api/auth/login", {
			email: state.email,
			password: state.password
		})
			.then(res => res.data)
			.then(res => {
				setState({ ...state, loading: false });
				onSignInSuccess(res.token, res.user);
			})
			.catch(err => {
				console.log({ err });
				setState({ ...state, loading: false, error: err.response.data });
			});
	};
	return (
		<Form onSubmit={handleFormSignIn}>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control
          type="email"
					value={state.email}
					onChange={e => setState({ ...state, email: e.target.value })}
					placeholder="Enter email"
					isInvalid={state.error.email}
				/>
				<Form.Control.Feedback type="invalid">
					{state.error.email}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					onChange={e => setState({ ...state, password: e.target.value })}
          placeholder="Password"
          isInvalid={state.error.password}
        />
        <Form.Control.Feedback type="invalid">
					{state.error.password}
				</Form.Control.Feedback>
			</Form.Group>
			<LoadingButton type="submit" loading={state.loading}>
				Sign in
			</LoadingButton>
		</Form>
	);
};

export default LoginForm;
