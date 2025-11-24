import { Routes, Route } from "react-router-dom";

import Menu from "./manage/Menu";
import Catalog from "./manage/Catalog";

const Manage = ({ setHeaderParams }) => {
    return (
        <>
            <Routes>
                <Route index element={<Menu setHeaderParams={setHeaderParams}/>}/>
                <Route path="catalog/*" element={<Catalog setHeaderParams={setHeaderParams}/>}/>
            </Routes>
        </>
    );
}
 
export default Manage;