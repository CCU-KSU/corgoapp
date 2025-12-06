import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { apiCall } from "../../utils/api";

import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import InputTickBox from "../../components/input/InputTickBox";
import Button from "../../components/button/Button";
import ButtonLink from "../../components/button/ButtonLink";
import Message from "../../components/text/Message";

import TOU from "../terms/TOU";

import Modal from "react-modal";

Modal.setAppElement('#root');

const PASSWORD_REQUIREMENTS = {
    minLength: 8, 
    hasUpperCase: /(?=.*[A-Z])/,
    hasLowerCase: /(?=.*[a-z])/,
    hasNumber: /(?=.*[0-9])/,
    hasSpecialChar: /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/
};

const Register = ({ setViewParams }) => {    
    const { register } = useAuth();

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Create Account",
            backURL: "/login",
            showNavBar: false
        }));
    }, [setViewParams]);

    const [modalIsOpen, setModalIsOpen] = useState({
        tou: false
    });

    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [touAgreement, setTouAgreement] = useState(false);

    const [message, setMessage] = useState({
        type: "success",
        message: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setMessage({ type: "error", message: "Passwords do not match."});
            return;
        }

        if (!PASSWORD_REQUIREMENTS.hasLowerCase.test(password)) {
            setMessage({ type: "error", message: "Password must contain at least one lowercase letter."});
            return;
        }
        if (password.length < PASSWORD_REQUIREMENTS.minLength) {
            setMessage({ type: "error", message: `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long.`});
            return;
        }
        if (!PASSWORD_REQUIREMENTS.hasNumber.test(password)) {
            setMessage({ type: "error", message: "Password must contain at least one number."});
            return;
        }
        if (!PASSWORD_REQUIREMENTS.hasSpecialChar.test(password)) {
            setMessage({ type: "error", message: "Password must contain at least one special character."});
            return;
        }

        try {
			e.preventDefault();
            setMessage({ type: "error", message: ""});
			await register(email, password);
            await apiCall("/users/register", {
				method: 'POST',
				body: {
                    firstName,
                    touAgreement
				},
			});
		} catch (error) {
            setMessage({ type: "error", message: `Failed to create an account: ${error.message}`});
		}
    }

    const toggleModal = (modalName) => {
        setModalIsOpen(curr => ({
            ...curr,
            [modalName]: !curr[modalName]
        }));
    }

    return (
        <>
            <div className="center-piece">
                {/* <h1>Sign Up!</h1> */}
                <Form id={"register"} onSubmit={handleSubmit}>
                    <Message type={"notice"} message={"Fill out the following."} isCentered />
                    <Message type={message.type} message={message.message} isCentered />
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
                    <Message type={"notice"} message={"Password must be lowercase, at least 8 characters long, have at least one number, and have at least one special character (@, #, %, etc.)"} isCentered />
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
                    {/* <ButtonLink
                        label={"Open & read the Terms of Use"}
                        target={"/tou"}
                        isExternal
                        buttonLike
                    /> */}
                    <Button
                        label={"View Terms of Use"}
                        action={() => toggleModal("tou")}
                        isSmall
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
                    <ButtonLink
                        label={"I have an account"}
                        target={"/login"}
                        buttonLike
                        showIcon={false}
                    />
                </Form>
            </div>
            <Modal
                isOpen={modalIsOpen.tou}
                onRequestClose={() => toggleModal("tou")}
                contentLabel="Terms of Use"
            >
                <TOU closeModal={() => toggleModal("tou")}/>
            </Modal>
        </>
    );
}
 
export default Register;