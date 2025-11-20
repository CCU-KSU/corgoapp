import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { apiCall } from "../../utils/api";

import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import InputTickBox from "../../components/input/InputTickBox";
import Button from "../../components/button/Button";
import Link from "../../components/button/Link";
import Notice from "../../components/text/Notice";
import Error from "../../components/text/Error";

const PASSWORD_REQUIREMENTS = {
    minLength: 8, 
    hasUpperCase: /(?=.*[A-Z])/,
    hasLowerCase: /(?=.*[a-z])/,
    hasNumber: /(?=.*[0-9])/,
    hasSpecialChar: /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/
};

const Register = () => {    
    const { register } = useAuth();

    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [touAgreement, setTouAgreement] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError("Passwords do not match.");
            return;
        }

        if (!PASSWORD_REQUIREMENTS.hasLowerCase.test(password)) {
            setError("Password must contain at least one lowercase letter.");
            return;
        }
        if (password.length < PASSWORD_REQUIREMENTS.minLength) {
            setError(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long.`);
            return;
        }
        if (!PASSWORD_REQUIREMENTS.hasNumber.test(password)) {
            setError("Password must contain at least one number.");
            return;
        }
        if (!PASSWORD_REQUIREMENTS.hasSpecialChar.test(password)) {
            setError("Password must contain at least one special character.");
            return;
        }

        try {
			e.preventDefault();
            setError("");
			await register(email, password);
            await apiCall("/users/register", {
				method: 'POST',
				body: {
                    firstName,
                    touAgreement
				},
			});
		} catch (error) {
			setError(`Failed to create an account: ${error.message}`);
		}
    }

    return (
        <>
            <div className="center-piece">
                <h1>Sign Up!</h1>
                <Form id={"register"} onSubmit={handleSubmit}>
                    {error && <Error message={error} isCentered={true}/>}
                    <Input
                        id={"firstName"}
                        type={"text"}
                        placeholder="First Name"
                        isRequired={true}
                        onChange={setFirstName}
                        value={firstName}
                        autoComplete={"given-name"}
                    />
                    <Input
                        id={"email"}
                        type={"email"}
                        placeholder="Email"
                        isRequired={true}
                        onChange={setEmail}
                        value={email}
                        autoComplete={"email"}
                    />
                    <Notice
                        message={"Password must be lowercase, at least 8 characters long, have at least one number, and have at least one special character (@, #, %, etc.)"}
                        isCentered={true}
                    />
                    <Input
                        id={"password"}
                        type={"password"}
                        placeholder="Password"
                        isRequired={true}
                        onChange={setPassword}
                        value={password}
                        autoComplete={"new-password"}
                    />
                    <Input
                        id={"passwordConfirm"}
                        type={"password"}
                        placeholder={"Confirm Password"}
                        isRequired={true}
                        onChange={setPasswordConfirm}
                        value={passwordConfirm}
                        autoComplete={"new-password"}
                    />
                    <Link
                        label={"Open & read the Terms of Use"}
                        target={"/app/tou"}
                        isExternal
                        buttonLike
                    />
                    <InputTickBox
                        label={"I have read the Terms of Use and agree to its contents."}
                        id={"touAccept"}
                        type={"checkbox"}
                        isRequired={true}
                        value={touAgreement}
                        onChange={setTouAgreement}
                    />
                    <Button
                        label={"Register"}
                        type={"submit"}
                    />
                    <Link
                        label={"I have an account"}
                        target={"/login"}
                        buttonLike
                    />
                </Form>
            </div>
        </>
    );
}
 
export default Register;