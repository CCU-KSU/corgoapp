import { Routes, Route } from "react-router-dom";

import Menu from "./manage/Menu";
import Catalog from "./manage/Catalog";
import Docs from "./manage/Docs";  

import NotFound from "./error/NotFound";

const Manage = ({ setViewParams }) => {
    return (
        <>
            <Routes>
                <Route index element={<Menu setViewParams={setViewParams}/>}/>
                <Route path="catalog/*" element={<Catalog setViewParams={setViewParams}/>}/>
                <Route path="docs/*" element={<Docs setViewParams={setViewParams}/>}/>
                <Route path="*" element={<NotFound setViewParams={setViewParams} />} />
            </Routes>
        </>
    );
}
 
export default Manage;