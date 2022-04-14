import PageLoader from "components/common/PageLoader";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "utils/API";

const ViewCourse = () => {
	const { domain } = useParams();
	const history = useHistory();
	const [course, setCourse] = useState(null);

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
		</>
	);
};

export default ViewCourse;
