import { SIGN_UP } from "actionTypes/appActionTypes";
import useAppDispatch from "hooks/useAppDispatch";
import React from "react";
import { Link } from "react-router-dom";
import authTokenStorage from "utils/authTokenStorage";
import SignupForm from "./SignupForm";

const SignUp = () => {
	const dispatch = useAppDispatch();

	const handleFormSignUp = (token, authData) => {
		const { courses, enrolledCourses, ...user } = authData;
		authTokenStorage.setToken(token);
		dispatch({
			type: SIGN_UP,
			payload: {
				user,
				courses,
				enrolledCourses
			}
		});
	};

	return (
		<>
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h4>Sign Up</h4>
				<p>
					or, <Link to="/auth/login">login to your account</Link>
				</p>
			</div>
			<SignupForm onFormSignUpSuccess={handleFormSignUp} />
		</>
	);
};

export default SignUp;
