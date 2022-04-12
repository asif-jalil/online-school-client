import { toast } from "react-toastify";

const showToastError = message => {
	toast.error(message || "Something went wrong");
};

export default showToastError;
