import useCourses from "hooks/useCourses";
import useEnrolledCourses from "hooks/useEnrolledCourse";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const Dashboard = () => {
	const courses = useCourses();
	const enrolledCourses = useEnrolledCourses();

	return (
		<>
			<h3 className="mb-5">Dashboard</h3>
			<Row>
				{enrolledCourses.length > 0 && (
					<Col md={6} xl={4}>
						<Card className="border border-primary text-center shadow">
							<Card.Body>
								<h5>Enrolled</h5>
								<h2 className="mb-0">{enrolledCourses.length}</h2>
							</Card.Body>
						</Card>
					</Col>
        )}
        
        {courses.length > 0 && (
					<Col md={6} xl={4}>
						<Card className="border border-primary text-center shadow">
							<Card.Body>
								<h5>Own Courses</h5>
								<h2 className="mb-0">{courses.length}</h2>
							</Card.Body>
						</Card>
					</Col>
				)}
			</Row>
		</>
	);
};

export default Dashboard;
