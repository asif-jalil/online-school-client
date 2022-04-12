import useUser from "hooks/useUser";
import React from "react";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";

const Profile = () => {
	const user = useUser();

	return (
		<>
			<h4>{user.name}</h4>
			<p className="text-muted mb-1">{user.email}</p>
      <small className="text-muted">{user.contact || "You did't set any contact number yet."}</small>
      
      <EditProfile />
      <ChangePassword />
		</>
	);
};

export default Profile;
