import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import BodySub from "../../components/container/BodySub";

import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Link from "../../components/button/Link";
import Notice from "../../components/text/Notice";
import Error from "../../components/text/Error";

const PasswordReset = () => { 
    const { resetPassword } = useAuth();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage("");
            setError("");
            await resetPassword(email);
            setMessage("Password reset link sent to your email! If you don't immediately see it, check your spam folder.");
            setEmailSent(true);
        } catch (error) {
            setError("Failed to send reset email. Please check the email address.");
        }
    }

    return (
        <>
            <div className="center-piece">
                <h1>Password Reset</h1>
                <Form id={"passwordReset"} onSubmit={handleSubmit}>
                    {message && <Notice message={message} isCentered={true} />}
                    {error && <Error message={error} isCentered={true} />}
                    {!emailSent && <Notice message={"Below, enter the email address you use to sign-in. Then tap/click on the button below it."} isCentered={true}/>}
                    <Input
                        id={"email"}
                        type={"email"}
                        placeholder="Email"
                        isRequired={true}
                        onChange={setEmail}
                        value={email}
                    />
                    {emailSent ? (
                        <Link
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