import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toasts

export function successMSG(msg: string) {
	toast.success(msg, {
		autoClose: 3000,
		closeButton: true,
		hideProgressBar: false,
		theme: "dark",
	});
}

export function errorMSG(msg: string) {
	toast.error(msg, {
		autoClose: 3000,
		closeButton: true,
		hideProgressBar: false,
		theme: "dark",
	});
}
