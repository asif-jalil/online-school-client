import LoadingButton from "components/common/LoadingButton";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import API from "utils/API";
import showToastError from "utils/showToastError";

const SignupForm = ({ onFormSignUpSuccess }) => {
	const [state, setState] = useState({
		loading: false,
		email: "",
		password: "",
		name: "",
		role: "",
		error: {}
	});

	const handleFormSignUp = e => {
		e.preventDefault();

		setState({ ...state, loading: true });

		API.post("/auth/signup", {
			email: state.email,
			password: state.password,
			name: state.name,
			role: state.role
		})
			.then(res => res.data)
			.then(res => {
				setState({ ...state, loading: false });
				onFormSignUpSuccess(res.token, res.user);
			})
			.catch(err => {
				setState({ ...state, loading: false, error: err.response.data });
				if (err.response.data.message) {
					showToastError(err.response.data.message);
				}
			});
	};

	return (
		<Form onSubmit={handleFormSignUp}>
			<Form.Group className="mb-3" controlId="formBasicName">
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="text"
					value={state.name}
					onChange={e => setState({ ...state, name: e.target.value })}
					placeholder="Your name"
					isInvalid={state.error.name}
				/>
				<Form.Control.Feedback type="invalid">
					{state.error.name}
				</Form.Control.Feedback>
			</Form.Group>

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

			<Form.Group className="mb-3" controlId="formBasicRole">
				<Form.Label>Signed Up As</Form.Label>
				<Form.Select aria-label="Default select example">
					<option>Choose</option>
					<option value="student">Student</option>
					<option value="teacher">Teacher</option>
				</Form.Select>
			</Form.Group>
			<LoadingButton type="submit" loading={state.loading}>
				Sign up
			</LoadingButton>
		</Form>
	);
};

export default SignupForm;
