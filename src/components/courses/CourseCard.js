import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CourseCard = ({ course, mentor }) => {
	return (
		<Col md={6} lg={6} xl={4} xxl={3} key={course.id} className="mb-4">
			<Card className="border-primary border h-100">
				<Card.Body>
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
			</Card>
		</Col>
	);
};

export default CourseCard;
