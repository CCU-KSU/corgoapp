import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import LoadingGate from "./components/effect/LoadingGate";

import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import PasswordReset from "./screens/auth/PasswordReset";

import Catalog from "./screens/Catalog";

const App = () => {
    const { currentUser, isAuthenticating } = useAuth()

    return (
        <LoadingGate isLoading={isAuthenticating}>
            <div className="body-app">
                <div className="body-content">
                    <Routes>
                        <Route path='/' element={<Navigate to="/catalog" replace />} />
                        <Route exact path="/login" element={currentUser ? <Navigate to={"/catalog"} /> : <Login />} />
                        <Route exact path="/register" element={currentUser ? <Navigate to={"/Catalog"} /> : <Register />} />
                        <Route exact path="/reset" element={currentUser ? <Navigate to={"/Catalog"} /> : <PasswordReset />} />
                        <Route exact path="/catalog" element={<Catalog/>} />
                    </Routes>
                </div>
            </div>
        </LoadingGate>

    )
}
 
export default App;