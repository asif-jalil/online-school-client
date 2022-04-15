import { CREATE_ENROLLMENT } from "actionTypes/appActionTypes";
import LoadingButton from "components/common/LoadingButton";
import useAppDispatch from "hooks/useAppDispatch";
import useEnrolledCourses from "hooks/useEnrolledCourse";
import useUser from "hooks/useUser";
import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "utils/API";

const CourseCard = ({ course, mentor }) => {
	const user = useUser();
	const enrolledCourse = useEnrolledCourses();
	const dispatch = useAppDispatch();
	const [state, setState] = useState({
		loading: false,
		isEnrolled: isEnrolled()
	});

	function isEnrolled() {
		return !!enrolledCourse.find(enCourse => enCourse?.id === course.id);
	}

	const handleEnroll = e => {
		e.stopPropagation();

		setState(prev => ({ ...prev, loading: true }));
		API.post("course/enroll", {
			courseId: course.id
		})
			.then(res => res.data)
			.then(res => {
				toast.success(res.message);
				setState(prev => ({ ...prev, loading: false, isEnrolled: true }));
				dispatch({
					type: CREATE_ENROLLMENT,
					payload: {
						enrolledCourse: res.enrolledCourse
					}
				});
			})
			.catch(err => {
				toast.error(err.response.data.message);
				setState(prev => ({ ...prev, loading: false }));
			});
	};

	return (
		<Col md={6} lg={6} xl={4} xxl={3} key={course.id} className="mb-4">
			<Card className="border-primary border h-100">
				<Card.Body className="position-relative">
					<h5>
						<Link
							className="stretched-link"
							to={`/course/${course.courseDomain}`}
						>
							{course.name}
						</Link>
					</h5>
					<p className="mb-0">Created by: {mentor.name}</p>
				</Card.Body>
				{mentor.id !== user.id && !state.isEnrolled && (
					<LoadingButton loading={state.loading} onClick={handleEnroll}>
						Enroll
					</LoadingButton>
				)}

				{
					state.isEnrolled && <div className="bg-dark fs--1 fw-bold py-1 px-3 text-white text-center"><i className="fas fa-check"></i> Enrolled</div>
				}
			</Card>
		</Col>
	);
};

export default CourseCard;
