import useEnrolledCourses from "hooks/useEnrolledCourse";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import CourseCard from "./CourseCard";

const EnrolledCourse = () => {
	const courses = useEnrolledCourses();
	console.log(courses);

	return (
		<>
			<h3 className="mb-5">Enrolled Course</h3>
			{!courses.length && (
				<p className="text-danger">You have not enrolled any course yet</p>
			)}
			<Row>
				{courses?.map(course => (
					<CourseCard course={course} mentor={course.mentor} key={course.id} />
				))}
			</Row>
		</>
	);
};

export default EnrolledCourse;
