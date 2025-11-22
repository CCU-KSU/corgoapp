import { Routes, Route } from "react-router-dom";

import Profile from "./account/Profile";
import EditProfile from "./account/EditProfile";
import ChangeEmail from "./account/ChangeEmail";
import ChangePassword from "./auth/ChangePassword";
import Deactivate from "./account/Deactivate";

const Account = ({ setHeaderParams }) => {
    return (
        <>
            <Routes>
                <Route index element={<Profile setHeaderParams={setHeaderParams}/>}/>
                <Route path="edit" element={<EditProfile setHeaderParams={setHeaderParams}/>} />
                <Route path="change-email" element={<ChangeEmail setHeaderParams={setHeaderParams}/>} />
                <Route path="change-password" element={<ChangePassword setHeaderParams={setHeaderParams}/>} />
                <Route path="deactivate" element={<Deactivate setHeaderParams={setHeaderParams}/>} />
            </Routes>
        </>
    );
}
 
export default Account;