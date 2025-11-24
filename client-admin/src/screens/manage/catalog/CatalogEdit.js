import { useEffect, useState } from "react";
import { apiCall } from "../../../utils/api";
import { useSearchParams } from "react-router-dom";

import Input from "../../../components/input/Input";
import InputBox from "../../../components/input/InputBox";
import InputDropdown from "../../../components/input/InputDropdown";
import Button from "../../../components/button/Button";

import Form from "../../../components/form/Form";
import Message from "../../../components/text/Message";

import BodySub from "../../../components/container/BodySub";
import SplitView from "../../../components-admin/container/SplitView";

const CatalogEdit = ({ setHeaderParams }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const paramsObject = Object.fromEntries(searchParams.entries());

    const [editorPrepStatus, setEditingPrepStatus] = useState(true);

    useEffect(() => {
        setHeaderParams(curr => ({
            ...curr,
            headerLabel: "Entry Editor",
            showAccount: false,
            backNav: "/manage/catalog"
        }));
    }, [setHeaderParams]);

    useEffect(() => {
        if (paramsObject.mode === "edit") {
            loadEntry();
        } else {
            loadBlank();
        }
    }, []);

    const loadEntry = async () => {
        console.log("Entry Loaded");
        
    };

    const loadBlank = () => {
        console.log("Blank Loaded");
        
    };

    const createEntry = () => {};

    const updateEntry = () => {};

    const deleteEntry = () => {};

    return (
        <>

        </>
    );
}
 
export default CatalogEdit;