import useApp from "./useApp";

const useEnrolledCourses = () => {
	const [app] = useApp();
	return app.enrolledCourses;
};

export default useEnrolledCourses;