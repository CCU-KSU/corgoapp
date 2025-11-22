import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import InputTickBox from "../../components/input/InputTickBox";

import Form from "../../components/form/Form";

import Message from "../../components/text/Message";

const Deactivate = ({ setHeaderParams }) => {
    const { currentUser, deleteUserAccount, reauthenticateUser } = useAuth();
    
    const [acknowledgment, setAcknowledgment] = useState(false)
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ type: "", message: "" });

    useEffect(() => {
        setHeaderParams(curr => ({
            ...curr,
            headerLabel: "Deactivate Account",
            showAccount: false,
            backNav: "/profile"
        }));
    }, [setHeaderParams]);
    
    const deactivateAccount = async (e) => {
        e.preventDefault();
        try {
            await reauthenticateUser(currentUser.email, password);
            // Delete database stuff
            await deleteUserAccount();
            setMessage({ type: "success", message: "Account successfully deactivated and all data removed. Redirecting..." });
        } catch (error) {
            setMessage({ type: "error", message: error.message });
        }
    };

    return (
        <>
            <Form onSubmit={deactivateAccount}>
                <Message type={message.type} message={message.message} isCentered/>
                <Message type="warning" message="Deactivating your account will remove any data associated with it. You will also no longer be able to sign-in with it's associated credentials." isCentered/>
                <InputTickBox
                    label={"I understand and would like to proceed with deactivation."}
                    isRequired
                    value={acknowledgment}
                    onChange={setAcknowledgment}
                />
                <Input
                    label={"Confirm Password"}
                    id="password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    autoComplete={"current-password"}
                    placeholder=""
                    isRequired
                />
                <Button
                    label="Deactivate Account"
                    type="submit"
                />
            </Form>
        </>
    );
}
 
export default Deactivate;