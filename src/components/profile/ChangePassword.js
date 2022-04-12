import LoadingButton from "components/common/LoadingButton";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import API from "utils/API";

const ChangePassword = () => {
	const [state, setState] = useState({
		loading: false,
		newPassword: "",
		confirmNewPassword: "",
		error: {}
	});

  const handleFormSubmit = e => {
		e.preventDefault();

		setState({ ...state, loading: true });
		API.put("/profile/password", {
			newPassword: state.newPassword,
			confirmNewPassword: state.confirmNewPassword
		})
			.then(res => res.data)
			.then(res => {
				setState({
					...state,
					loading: false,
					newPassword: "",
					confirmNewPassword: "",
					error: {}
				});
				toast.success(res.message);
			})
			.catch(err => {
				setState({ ...state, loading: false, error: err.response.data });
			});
	};

	return (
		<Row className="mt-6">
			<Col md={8} lg={5} xl={4}>
				<Form onSubmit={handleFormSubmit}>
					<Form.Group className="mb-3" controlId="newPassword">
						<Form.Label>Current Password</Form.Label>
						<Form.Control
							type="password"
              value={state.newPassword}
							onChange={e =>
								setState({ ...state, newPassword: e.target.value })
							}
							placeholder="New Password"
							isInvalid={state.error.newPassword}
						/>
						<Form.Control.Feedback type="invalid">
							{state.error.newPassword}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="confirmNewPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
              type="password"
              value={state.confirmNewPassword}
							onChange={e =>
								setState({
									...state,
									confirmNewPassword: e.target.value
								})
							}
							placeholder="Confirm New Password"
              isInvalid={state.error.confirmNewPassword}
						/>
            <Form.Control.Feedback type="invalid">
							{state.error.confirmNewPassword}
						</Form.Control.Feedback>
					</Form.Group>

					<LoadingButton type="submit" loading={state.loading}>
						Change Password
					</LoadingButton>
				</Form>
			</Col>
		</Row>
	);
};

export default ChangePassword;
