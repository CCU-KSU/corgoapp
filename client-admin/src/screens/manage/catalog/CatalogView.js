import { useEffect, useState } from "react";
import { apiCall } from "../../../utils/api";

import Link from "../../../components/button/Link";

const CatalogView = ({ setHeaderParams }) => {
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