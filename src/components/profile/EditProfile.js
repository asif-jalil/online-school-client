import { UPDATE_USER } from "actionTypes/appActionTypes";
import LoadingButton from "components/common/LoadingButton";
import useAppDispatch from "hooks/useAppDispatch";
import useUser from "hooks/useUser";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import API from "utils/API";

const EditProfile = () => {
  const user = useUser();
  const dispatch = useAppDispatch();
	const [state, setState] = useState({
		loading: false,
		name: user?.name,
		contact: user?.contact,
		error: {}
	});

  const handleFormSubmit = e => {
		e.preventDefault();

		setState({ ...state, loading: true });
		API.put("/profile", {
			name: state.name,
		  contact: state.contact
		})
			.then(res => res.data)
			.then(res => {
        setState({ ...state, loading: false, error: {} });
        toast.success(res.message);
				dispatch({
					type: UPDATE_USER,
					payload: {
						user: res.user
					}
				});
      })
			.catch(err => {
				setState({ ...state, loading: false, error: err.response.data });
			});
	};

	return (
		<Row className="mt-6">
			<Col md={8} lg={5} xl={4}>
				<Form onSubmit={handleFormSubmit}>
					<Form.Group className="mb-3" controlId="formBasicName">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							value={state.name}
							onChange={e =>
								setState({ ...state, name: e.target.value })
							}
							placeholder="Your name"
							isInvalid={state.error.name}
						/>
						<Form.Control.Feedback type="invalid">
							{state.error.name}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicContact">
						<Form.Label>Contact</Form.Label>
						<Form.Control
							type="text"
							value={state.contact}
							onChange={e =>
								setState({ ...state, contact: e.target.value })
							}
							placeholder="Your phone number"
						/>
					</Form.Group>

					<LoadingButton type="submit" loading={state.loading}>
						Update Profile
					</LoadingButton>
				</Form>
			</Col>
		</Row>
	);
};

export default EditProfile;
