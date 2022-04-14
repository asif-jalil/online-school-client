import React from "react";
import { useParams } from "react-router-dom";

const Course = () => {
	const { domain } = useParams();

	console.log(domain);
	return (
		<div>
			<h3>New testing course</h3>
		</div>
	);
};

export default Course;
