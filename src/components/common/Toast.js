import React from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import CloseButton from "./CloseButton";

const Toast = () => (
	<ToastContainer
		position={toast.POSITION.BOTTOM_LEFT}
		transition={Slide}
		hideProgressBar
		closeButton={<CloseButton />}
		newestOnTop={true}
		icon={false}
	/>
);

export default Toast;