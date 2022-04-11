import { SIGN_IN } from "actionTypes/appActionTypes";
import useAppDispatch from "hooks/useAppDispatch";
import React from "react";
import { Link } from "react-router-dom";
import authTokenStorage from "utils/authTokenStorage";
import LoginForm from "./LoginForm";

const Login = () => {
  const dispatch = useAppDispatch();

	const handleSignIn = (token, authData) => {
		const {...user } = authData;
		authTokenStorage.setToken(token);
		dispatch({
			type: SIGN_IN,
			payload: {
				user,
			}
		});
  };
  
	return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Login</h4>
        <p>or, <Link to="/auth/signup">create an account</Link></p>
      </div>
			<LoginForm onSignInSuccess={handleSignIn} />
		</>
	);
};

export default Login;
