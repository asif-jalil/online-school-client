import useApp from "./useApp";

const useUser = () => {
	const [app] = useApp();
	return app.user;
};

export default useUser;