import { Routes, Route } from "react-router-dom";

import CatalogView from "./catalog/CatalogView";
import CatalogEdit from "./catalog/CatalogEdit";

const Catalog = ({ setViewParams }) => {
    return (
        <>
            <Routes>
                <Route index element={<CatalogView setViewParams={setViewParams}/>}/>
                <Route path="editor" element={<CatalogEdit setViewParams={setViewParams}/>}/>
            </Routes>
        </>
    );
}
 
export default Catalog;