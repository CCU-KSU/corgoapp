import { Routes, Route } from "react-router-dom";

import CatalogView from "./catalog/CatalogView";
import CatalogEdit from "./catalog/CatalogEdit";

const Catalog = ({ setHeaderParams }) => {
    return (
        <>
            <Routes>
                <Route index element={<CatalogView setHeaderParams={setHeaderParams}/>}/>
                <Route path="editor" element={<CatalogEdit setHeaderParams={setHeaderParams}/>}/>
            </Routes>
        </>
    );
}
 
export default Catalog;