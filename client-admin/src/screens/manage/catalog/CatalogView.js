import { useEffect, useState } from "react";
import { apiCall } from "../../../utils/api";

import Link from "../../../components/button/Link";

const CatalogView = ({ setViewParams }) => {
    const [catalogLoadStatus, setCatalogLoadStatus] = useState(true);

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Manage Catalog",
            backURL: "/manage"
        }));
    }, [setViewParams]);

    const refreshEntryList = async () => {};

    return (
        <>
            <Link
                label="Edit"
                target={"editor?mode=edit&id=123"}
            />
            <Link
                label="Create"
                target={"editor?mode=new"}
            />
        </>
    );
}
 
export default CatalogView;