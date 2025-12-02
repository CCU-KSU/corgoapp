import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import LoadingGate from "./components/effect/LoadingGate";
import WithPrivateRoute from "./utils/PrivateRoute";
import Header from "./components/header/Header";
import NavBar from "./components/navbar/NavBar";
import NavBarItem from "./components/navbar/NavBarItem";

import Icon_Nav_Catalog from "./assets/icon/square-4-grid.svg";
import Icon_Nav_Check_Mark from "./assets/icon/checkmark-square.svg";
import Icon_Nav_Profile from "./assets/icon/user.svg";

import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import PasswordReset from "./screens/auth/PasswordReset";

import Catalog from "./screens/Catalog";
import Account from "./screens/Account";

import TOU from "./screens/terms/TOU";
import NotFound from "./screens/error/NotFound";

const App = () => {
    const { currentUser, isAuthenticating } = useAuth()

    const [viewParams, setViewParams] = useState({
        showHeader: true,
        headerLabel: "",
        backURL: "",
        showNavBar: true
    });

    return (
        <LoadingGate isLoading={isAuthenticating}>
            <div className="body-app">
                {viewParams.showHeader && <Header viewParams={viewParams} />}
                <div className="body-content">
                    <Routes>
                        <Route index element={<Navigate to="/catalog" replace />} />
                        <Route path="/login" element={currentUser ? <Navigate to={"/catalog"} /> : <Login  setViewParams={setViewParams}/>} />
                        <Route path="/register" element={currentUser ? <Navigate to={"/catalog"} /> : <Register  setViewParams={setViewParams}/>} />
                        <Route path="/reset" element={currentUser ? <Navigate to={"/catalog"} /> : <PasswordReset  setViewParams={setViewParams}/>} />
                        <Route path="/catalog/*" element={<Catalog setViewParams={setViewParams}/>} />
                        
                        <Route path="/profile/*" element={
                            <WithPrivateRoute>
                                <Account setViewParams={setViewParams}/>
                            </WithPrivateRoute>
                        } />

                        <Route path="/tou" element={<TOU setViewParams={setViewParams}/>} />
                        <Route path="*" element={<NotFound setViewParams={setViewParams} />} />
                    </Routes>
                </div>
                {viewParams.showNavBar && <NavBar baseUrl="">
                    <NavBarItem iconRef={Icon_Nav_Catalog} navTo="catalog" />
                    <NavBarItem iconRef={Icon_Nav_Check_Mark} navTo="tasks" />
                    <NavBarItem iconRef={Icon_Nav_Profile} navTo="profile" />
                </NavBar>}
            </div>
        </LoadingGate>
    )
}
 
export default App;