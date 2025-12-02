import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import LoadingGate from "./components/effect/LoadingGate";
import WithPrivateRoute from "./utils/PrivateRoute";
import Header from "./components/header/Header";

import Login from "./screens/auth/Login";
import Manage from "./screens/Manage";

const App = () => {
	const { currentUser, isAuthenticating } = useAuth()

	const [viewParams, setViewParams] = useState({
        showHeader: true,
        headerLabel: "",
        backURL: "",
        showNavBar: true
    });

	return (
		<>
			<LoadingGate isLoading={isAuthenticating}>
				<div className="body-app">
					{viewParams.showHeader && <Header viewParams={viewParams} />}
					<div className="body-content">
						<Routes>
							<Route index element={<Navigate to="/manage" replace />} />
							<Route path="/login" element={currentUser ? <Navigate to={"/manage"} /> : <Login  setViewParams={setViewParams}/>} />
							<Route path="/manage/*" element={
								<WithPrivateRoute>
									<Manage setViewParams={setViewParams}/>
								</WithPrivateRoute>
							} />
						</Routes>
					</div>
				</div>
			</LoadingGate>
		</>
	);
}
 
export default App;