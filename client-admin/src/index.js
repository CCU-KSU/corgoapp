import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import "./index-admin.css";
import App from "./App";
import ErrorScreen from "./screens/error/ErrorScreen";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ErrorBoundary FallbackComponent={ErrorScreen}>
				<AuthProvider>
					<App />
				</AuthProvider>
			</ErrorBoundary>
		</BrowserRouter>
	</React.StrictMode>
);

