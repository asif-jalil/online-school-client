import PageLoader from "components/common/PageLoader";
import useUser from "hooks/useUser";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";
import API from "utils/API";
import CourseCard from "./CourseCard";

const CourseGallery = () => {
	const [state, setState] = useState({
		loading: true,
		courses: []
	});

	useEffect(() => {
		API.get("/course")
			.then(res => res.data)
      .then(res => {
				setState(prev => ({ ...prev, loading: false, courses: res.courses }));
			})
			.catch(err => {
				toast.error(err.response.data.message);
				setState(prev => ({ ...prev, loading: false }));
			});
	}, []);

	if (state.loading) {
		return <PageLoader type="full" />;
	}

	return (
		<div>
			<h3 className="mb-5">Course market</h3>
			{!state.courses.length && (
				<p className="text-danger">
					There is nothing available for you. May be there is no course in the
					market or there is only your course. You cant get your own course.
				</p>
			)}
			<Row>
				{state.courses.map(course => (
					<CourseCard course={course} mentor={course.mentor} key={course.id} />
				))}
			</Row>
		</div>
	);
};

export default CourseGallery;
