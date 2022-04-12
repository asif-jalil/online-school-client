import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "context/AppContext";
import Toast from "components/common/Toast";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AppProvider>
				<App />
				<Toast />
			</AppProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
