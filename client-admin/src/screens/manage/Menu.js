import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link as A } from "react-router-dom";

import Button from "../../components/button/Button";

import SpacedItems from "../../components/container/SpacedItems";
import LinkListBox from "../../components/container/LinkListBox";

const Menu = ({ setHeaderParams }) => {
    const { logout } = useAuth();

    useEffect(() => {
        setHeaderParams(curr => ({
            ...curr,
            headerLabel: "Main Menu",
            showAccount: false,
            backNav: ""
        }));
    }, [setHeaderParams]);

    const handleLogout = async () => {
		try {
			await logout()
		} catch (error) {
			alert("Failed to logout!");
		}
	};

    return (
        <>
            <SpacedItems>
                <LinkListBox>
                    <A to={"catalog"}>{"Manage Catalog"}</A>
                    <A to={"metadata"}>{"Manage Metadata"}</A>
                    <A to={"guides"}>{"Manage Quick Guides"}</A>
                </LinkListBox>
                <Button
                    label="Logout"
                    action={handleLogout}
                />
            </SpacedItems>
        </>
    );
}
 
export default Menu;