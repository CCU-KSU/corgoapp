import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import ButtonLink from "../../components/button/ButtonLink";
import Message from "../../components/text/Message";

const PasswordReset = ({ setViewParams }) => { 
    const { resetPassword } = useAuth();

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Recover Account",
            backURL: "/login",
            showNavBar: false
        }));
    }, [setViewParams]);

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({
        type: "success",
        message: ""
    });
    const [message2, setMessage2] = useState({
        type: "success",
        message: ""
    });
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage({ type: "error", message: ""});
            setMessage2({ type: "error", message: ""});
            await resetPassword(email);
            setMessage2({ type: "success", message: "Password reset link sent to your email! If you don't immediately see it, check your spam folder."});
            setEmailSent(true);
        } catch (error) {
            setMessage({ type: "error", message: "Failed to send reset email. Please check the email address."});
        }
    }

    return (
        <>
            <div className="center-piece">
                <h1>Password Reset</h1>
                <Form id={"passwordReset"} onSubmit={handleSubmit}>
                    <Message type={message.type} message={message.message} isCentered />
                    <Message type={message2.type} message={message2.message} isCentered />
                    {!emailSent && <Message type={"notice"} message={"Below, enter the email address you use to sign-in. Then tap/click on the button below it."} isCentered />}
                    <Input
                        id={"email"}
                        type={"email"}
                        placeholder="Email"
                        isRequired={true}
                        onChange={setEmail}
                        value={email}
                    />
                    {emailSent ? (
                        <ButtonLink
                            label={"Back to Sign-In"}
                            target={"/login"}
                            buttonLike
                        />
                    ) : (
                        <Button
                            label={"Send Password Reset Email"}
                            type={"submit"}
                        />
                    )}
                </Form>
            </div>
        </>
    );
}
 
export default PasswordReset;