import { Routes, Route } from "react-router-dom";

import DocsView from "./docs/DocsView";
import DocsEdit from "./docs/DocsEdit";

const Docs = ({ setViewParams }) => {
    return (
        <>
            <Routes>
                <Route index element={<DocsView setViewParams={setViewParams}/>}/>
                <Route path="editor" element={<DocsEdit setViewParams={setViewParams}/>}/>
            </Routes>
        </>
    );
}
 
export default Docs;