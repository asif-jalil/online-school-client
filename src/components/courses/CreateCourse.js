import { CREATE_COURSE } from "actionTypes/appActionTypes";
import LoadingButton from "components/common/LoadingButton";
import useAppDispatch from "hooks/useAppDispatch";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import API from "utils/API";

const CreateCourse = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
	const [state, setState] = useState({
		loading: false,
		courseName: "",
		error: {}
	});

	const handleSubmit = e => {
		e.preventDefault();

		setState({ ...state, loading: true });
		API.post("/course", {
			name: state.courseName
		})
			.then(res => res.data)
			.then(res => {
				toast.success(res.message);
				setTimeout(() => {
					history.push("/my-courses");
        }, 1000);
        dispatch({
          type: CREATE_COURSE,
          payload: {
            course: res.course
          }
        });
				setState({ ...state, error: {}, loading: false });
			})
			.catch(err => {
				toast.error(err.response.data.message);
				setState({ ...state, loading: false, error: err.response.data });
			});
	};

	return (
		<div>
			<h3 className="mb-5">Create new course</h3>
			<Row>
				<Col lg={6} xl={6} xxl={4}>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Course name</Form.Label>
							<Form.Control
								type="text"
								value={state.email}
								onChange={e =>
									setState({ ...state, courseName: e.target.value })
								}
								isInvalid={state.error.name}
							/>
							<Form.Control.Feedback type="invalid">
								{state.error.name}
							</Form.Control.Feedback>
						</Form.Group>

						<LoadingButton type="submit" loading={state.loading}>
							Create
						</LoadingButton>
					</Form>
				</Col>
			</Row>
		</div>
	);
};

export default CreateCourse;
