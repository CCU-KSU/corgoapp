import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import Form from "../../components/form/Form";
import Message from "../../components/text/Message";

const PASSWORD_REQUIREMENTS = {
    minLength: 8, 
    hasUpperCase: /(?=.*[A-Z])/,
    hasLowerCase: /(?=.*[a-z])/,
    hasNumber: /(?=.*[0-9])/,
    hasSpecialChar: /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/
};

const ChangePassword = ({ setViewParams }) => {

    const { currentUser, updateUserPassword, reauthenticateUser } = useAuth();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [message, setMessage] = useState({
        type: "success",
        message: ""
    });

    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Change Password",
            backURL: "/profile",
            showNavBar: false
        }));
    }, [setViewParams]);

    useEffect(() => {
        if (currentPassword || newPassword) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [currentPassword, newPassword]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!PASSWORD_REQUIREMENTS.hasLowerCase.test(newPassword)) {
            setMessage({ type: "error", message: "New password must contain at least one lowercase letter."});
            return;
        }
        if (newPassword.length < PASSWORD_REQUIREMENTS.minLength) {
            setMessage({ type: "error", message: `New password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long.`});
            return;
        }
        if (!PASSWORD_REQUIREMENTS.hasNumber.test(newPassword)) {
            setMessage({ type: "error", message: "New password must contain at least one number."});
            return;
        }
        if (!PASSWORD_REQUIREMENTS.hasSpecialChar.test(newPassword)) {
            setMessage({ type: "error", message: "New password must contain at least one special character."});
            return;
        }

        try {
            setMessage({ type: "error", message: ""});

            await reauthenticateUser(currentUser.email, currentPassword);

            await updateUserPassword(newPassword);

            setCurrentPassword("");
            setNewPassword("");
            setMessage({ type: "success", message: "Password Updated Successfully!"}); 
        } catch (error) {
            console.error("Password update failed:", error);
            let errorMessage = "Failed to update password. Please try again.";
            
            if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                errorMessage = "Incorrect current password. Please check your current password and try again.";
            } else if (error.code === 'auth/requires-recent-login') {
                errorMessage = "This operation is sensitive and requires recent authentication. Please log out and log back in, then immediately try to change your password.";
            }

            setMessage({ type: "error", message: errorMessage});
        }
    };
        
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Message type={message.type} message={message.message} isCentered/>
                <Input
                    label={"Current Password"}
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    autoComplete={"current-password"}
                    placeholder=""
                />
                <Input
                    label={"New Password"}
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={setNewPassword}
                    autoComplete={"new-password"}
                    placeholder=""
                />
                <Button
                    type="submit"
                    label="Submit"
                    disabled={!canSubmit}
                />
            </Form>
        </>
    );
}
 
export default ChangePassword;