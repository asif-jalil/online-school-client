import classNames from "classnames";
import LoadingButton from "components/common/LoadingButton";
import PageLoader from "components/common/PageLoader";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "utils/API";
import isPassed from "utils/isPassed";

const ViewCourse = () => {
	const { domain } = useParams();
	const history = useHistory();
	const [course, setCourse] = useState(null);
	const [quizzes, setQuizzes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [answer, setAnswer] = useState({});
	const [result, setResult] = useState({});

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

	const handleTakeExam = () => {
		setLoading(true);
		setAnswer({});
		setResult({});
		API.get(`/quiz/${course?.id}`)
			.then(res => res.data)
			.then(res => {
				setLoading(false);
				setQuizzes(res.quizzes);
			})
			.catch(err => {
				toast.error(err.response.data.message);
				setLoading(false);
			});
	};

	const handleSubmitQuiz = e => {
		e.preventDefault();

		setLoading(true);
		API.post("/quiz/exam", {
			courseId: course.id,
			answer
		})
			.then(res => res.data)
			.then(res => {
				setLoading(false);
				setResult(res);
				setAnswer({});
				setQuizzes([]);
			})
			.catch(err => {
				console.log({ err });
				toast.error(err.response?.data?.message);
			});
	};

	if (!course) {
		return <PageLoader type="full" />;
	}

	return (
		<>
			<h3>{course.name}</h3>
			<h5>
				Mentor: <span className="text-muted">{course.mentor.name}</span>
			</h5>
			<p>Email: {course.mentor.email}</p>
			{!quizzes.length && (
				<LoadingButton onClick={handleTakeExam} loading={loading}>
					Take Exam
				</LoadingButton>
			)}

			{Object.keys(result).length > 0 && (
				<>
					<h5
						className={classNames("mt-5", {
							"text-danger": !isPassed(result.totalMarks, result.obtainedMark),
							"text-success": isPassed(result.totalMarks, result.obtainedMark)
						})}
					>
						You are{" "}
						{result.obtainedMark >= 0.5 * result.totalMarks
							? "passed 😍"
							: "failed!!"}
					</h5>
					<p
						className={classNames({
							"text-danger": !isPassed(result.totalMarks, result.obtainedMark),
							"text-success": isPassed(result.totalMarks, result.obtainedMark)
						})}
					>
						You got {result.obtainedMark} mark out of {result.totalMarks}
					</p>
				</>
			)}

			{!!quizzes.length && (
				<Row className="mt-5">
					<Col md={8} lg={6} xl={4}>
						<h4>Start you game. Cheers!</h4>
						<Form onSubmit={handleSubmitQuiz}>
							{quizzes.map((quiz, index) => (
								<div key={quiz.id} className="mb-3">
									<p>
										{index + 1}. {quiz.question}
									</p>
									{quiz?.options.map(opt => (
										<Form.Check key={opt.id} type="radio">
											<Form.Check.Input
												type="radio"
												name={`question${quiz.id}`}
												value={opt.id}
												onChange={e =>
													setAnswer({
														...answer,
														[quiz.id]: e.target.value
													})
												}
												// isInValid
											/>
											<Form.Check.Label>{opt.option}</Form.Check.Label>
											{/* <Form.Control.Feedback type="invalid">
												You did it!
											</Form.Control.Feedback> */}
										</Form.Check>
									))}
								</div>
							))}
							<LoadingButton type="submit" loading={loading}>
								Submit Answer
							</LoadingButton>
						</Form>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ViewCourse;
