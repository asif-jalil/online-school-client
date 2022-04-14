import useCourses from "hooks/useCourses";
import useUser from "hooks/useUser";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

const MyCourses = () => {
	const courses = useCourses();
	const user = useUser();

	return (
		<>
			<h3 className="mb-5">My created course</h3>
			<Row>
				{courses.map(course => (
					<CourseCard course={course} mentor={user} key={course.id} />
				))}

				<Col md={6} lg={6} xl={4} xxl={3} className="mb-4">
					<Card
						className="border-primary border h-100"
						style={{ background: "transparent" }}
					>
						<Card.Body className="d-flex align-items-center">
							<i className="far fa-plus-circle fs-3 me-2"></i>
							<div>
								<h5>Add New Course</h5>
								<Link className="stretched-link" to="/create-course">
									Add new
								</Link>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default MyCourses;
