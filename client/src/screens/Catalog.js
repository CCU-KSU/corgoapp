import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
// import { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";

// import Button from "../components/button/Button";
// import ButtonIcon from '../components/button/ButtonIcon';
// import Link from "../components/button/Link";

// import LoadingGate from "../components/effect/LoadingGate";
import NotFound from './error/NotFound';

const Catalog = ({ setHeaderParams }) => {

    useEffect(() => {
        setHeaderParams(curr => ({
            ...curr,
            headerLabel: "Catalog",
            showAccount: true,
            backNav: ""
        }));
    }, [setHeaderParams]);

    return (
        <Routes>
            <Route index element={
                <span>index</span>
            }/>
            <Route path=":itemId" element={<span>item</span>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
 
export default Catalog;