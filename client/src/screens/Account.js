import { Routes, Route } from "react-router-dom";

import Profile from "./account/Profile";
import EditProfile from "./account/EditProfile";
import ChangeEmail from "./account/ChangeEmail";
import ChangePassword from "./auth/ChangePassword";
import Deactivate from "./account/Deactivate";

const Account = ({ setViewParams }) => {
    return (
        <>
            <Routes>
                <Route index element={<Profile setViewParams={setViewParams}/>}/>
                <Route path="edit" element={<EditProfile setViewParams={setViewParams}/>} />
                <Route path="change-email" element={<ChangeEmail setViewParams={setViewParams}/>} />
                <Route path="change-password" element={<ChangePassword setViewParams={setViewParams}/>} />
                <Route path="deactivate" element={<Deactivate setViewParams={setViewParams}/>} />
            </Routes>
        </>
    );
}
 
export default Account;