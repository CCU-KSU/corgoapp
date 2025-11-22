import { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";
import { useNavigate } from "react-router-dom";

import Input from "../../components/input/Input";
import InputBox from "../../components/input/InputBox";
import InputDropdown from "../../components/input/InputDropdown";
import Button from "../../components/button/Button";

import Form from "../../components/form/Form";
import Message from "../../components/text/Message";

const Catalog = ({ setHeaderParams }) => {

    const [editorPrepStatus, setEditingPrepStatus] = useState(true);
    const [catalogLoadStatus, setCatalogLoadStatus] = useState(true);

    useEffect(() => {
        setHeaderParams(curr => ({
            ...curr,
            headerLabel: "Manage Catalog",
            showAccount: false,
            backNav: "/manage"
        }));
    }, [setHeaderParams]);

    const refreshEntryList = async () => {};
    const createEntry = () => {};
    const deleteEntry = () => {};
    const updateEntry = () => {};

    return (
        <>
            
        </>
    );
}
 
export default Catalog;