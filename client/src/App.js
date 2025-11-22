import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import LoadingGate from "./components/effect/LoadingGate";
import WithPrivateRoute from "./utils/PrivateRoute";
import Header from "./components/header/Header";

import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import PasswordReset from "./screens/auth/PasswordReset";

import Catalog from "./screens/Catalog";
import Account from "./screens/Account";

import NotFound from "./screens/error/NotFound";

const App = () => {
    const { currentUser, isAuthenticating } = useAuth()
    const [headerParams, setHeaderParams] = useState({
        headerLabel: "",
        showAccount: true,
        backNav: "",
        show: true
    });

    return (
        <LoadingGate isLoading={isAuthenticating}>
            <div className="body-app">
                {headerParams.show && <Header headerParams={headerParams} />}
                <div className="body-content">
                    <Routes>
                        <Route index element={<Navigate to="/catalog" replace />} />
                        <Route path="/login" element={currentUser ? <Navigate to={"/catalog"} /> : <Login  setHeaderParams={setHeaderParams}/>} />
                        <Route path="/register" element={currentUser ? <Navigate to={"/catalog"} /> : <Register  setHeaderParams={setHeaderParams}/>} />
                        <Route path="/reset" element={currentUser ? <Navigate to={"/catalog"} /> : <PasswordReset  setHeaderParams={setHeaderParams}/>} />
                        <Route path="/catalog/*" element={<Catalog setHeaderParams={setHeaderParams}/>} />
                        
                        <Route path="/profile/*" element={
                            <WithPrivateRoute>
                                <Account setHeaderParams={setHeaderParams}/>
                            </WithPrivateRoute>
                        } />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </LoadingGate>
    )
}
 
export default App;