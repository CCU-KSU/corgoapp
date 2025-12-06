import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link as A } from "react-router-dom";

import Button from "../../components/button/Button";

import SpacedItems from "../../components/container/SpacedItems";
import LinkListBox from "../../components/container/LinkListBox";

const Menu = ({ setViewParams }) => {
    const { logout } = useAuth();

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            showHeader: true,
            headerLabel: "Main Menu",
            showAccount: false,
            backURL: ""
        }));
    }, [setViewParams]);

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
                    {/* <A to={"metadata"}>{"Manage Metadata"}</A> */}
                    {/* <A to={"checklists"}>{"Manage Checklists"}</A> */}
                    <A to={"docs"}>{"Manage Documents"}</A>
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