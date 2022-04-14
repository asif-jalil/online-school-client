import useApp from "./useApp";

const useCourses = () => {
	const [app] = useApp();
	return app.courses;
};

export default useCourses;