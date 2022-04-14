import LoadingButton from "components/common/LoadingButton";
import PageLoader from "components/common/PageLoader";
import React, { useEffect, useState } from "react";
import { Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "utils/API";

const EditCourse = () => {
	const { domain } = useParams();
	const history = useHistory();
	const [course, setCourse] = useState(null);
	const [state, setState] = useState({
		loading: false,
		question: "",
		option1: "",
		option2: "",
		option3: "",
		option4: "",
		answer: "",
		error: {}
	});

	useEffect(() => {
		API.get(`/course/${domain}`)
			.then(res => res.data)
			.then(res => {
				setCourse(res.course);
			})
			.catch(err => {
				toast.error(err.response.data.message);
				history.push("/");
			});
	}, [domain, history]);

	const showError = key => {
		if (!state[key]) {
			setState({
				...state,
				error: { [key]: "Not filled" }
			});

			return true;
		}

		return false;
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (showError("option1")) return;
		if (showError("option2")) return;
		if (showError("option3")) return;
		if (showError("option4")) return;
		if (showError("answer")) return;

		setState({ ...state, loading: true, error: {} });
		API.post("/quiz", {
			courseId: course.id,
			question: state.question,
			options: [
				{ option: state.option1, answer: state.option1 === state.answer },
				{ option: state.option2, answer: state.option2 === state.answer },
				{ option: state.option3, answer: state.option3 === state.answer },
				{ option: state.option4, answer: state.option4 === state.answer }
			]
		})
			.then(res => res.data)
			.then(res => {
				toast.success(res.message);
				setState({
					loading: false,
					question: "",
					option1: "",
					option2: "",
					option3: "",
					option4: "",
					answer: "",
					error: {}
				});
			})
			.catch(err => {
				toast.error(err.response.data.message);
				setState({ ...state, loading: false, error: err.response.data });
			});
	};

	if (!course) {
		return <PageLoader type="full" />;
	}

	return (
		<>
			<h3 className="mb-5">{course.name}</h3>
			<h5>Add MCQ</h5>
			<Form onSubmit={handleSubmit}>
				<Row>
					<Col md={8} lg={6} xl={4} xxl={3}>
						<Form.Group className="mb-3">
							<Form.Label>Write your question</Form.Label>
							<Form.Control
								type="text"
								value={state.question}
								onChange={e => setState({ ...state, question: e.target.value })}
								isInvalid={state.error.question}
							/>
							<Form.Control.Feedback type="invalid">
								{state.error.question}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Label>Write 4 option </Form.Label>
						<Form.Text>(Select the answer)</Form.Text>
						<InputGroup className="mb-3">
							<InputGroup.Radio
								type="radio"
								name="option"
								value={state.option1}
								isInvalid={state.error.answer}
								onChange={e => setState({ ...state, answer: e.target.value })}
							/>
							<FormControl
								value={state.option1}
								isInvalid={state.error.option1}
								onChange={e => setState({ ...state, option1: e.target.value })}
								size="sm"
							/>
						</InputGroup>
						<InputGroup className="mb-3">
							<InputGroup.Radio
								type="radio"
								name="option"
								value={state.option2}
								isInvalid={state.error.answer}
								onChange={e => setState({ ...state, answer: e.target.value })}
							/>
							<FormControl
								value={state.option2}
								isInvalid={state.error.option2}
								onChange={e => setState({ ...state, option2: e.target.value })}
								size="sm"
							/>
						</InputGroup>
						<InputGroup className="mb-3">
							<InputGroup.Radio
								type="radio"
								name="option"
								value={state.option3}
								isInvalid={state.error.answer}
								onChange={e => setState({ ...state, answer: e.target.value })}
							/>
							<FormControl
								value={state.option3}
								isInvalid={state.error.option3}
								onChange={e => setState({ ...state, option3: e.target.value })}
								size="sm"
							/>
						</InputGroup>
						<InputGroup className="mb-3">
							<InputGroup.Radio
								type="radio"
								name="option"
								value={state.option4}
								isInvalid={state.error.answer}
								onChange={e => setState({ ...state, answer: e.target.value })}
							/>
							<FormControl
								value={state.option4}
								isInvalid={state.error.option4}
								onChange={e => setState({ ...state, option4: e.target.value })}
								size="sm"
							/>
						</InputGroup>
					</Col>
				</Row>

				<LoadingButton type="submit" loading={state.loading}>
					Save
				</LoadingButton>
			</Form>
		</>
	);
};

export default EditCourse;
