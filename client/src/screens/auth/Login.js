import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import BodySub from "../../components/container/BodySub";

import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import ButtonLink from "../../components/button/ButtonLink";
import Message from "../../components/text/Message";

const Login = ({ setViewParams }) => {
    const { login } = useAuth();

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Login",
            backURL: "/catalog",
            showNavBar: false
        }));
    }, [setViewParams]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState({
        type: "success",
        message: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage({ type: "error", message: ""});
			e.preventDefault();
			await login(email, password);
		} catch (error) {
			setMessage({ type: "error", message: error.message});
		}
    }

    return (
        <>
            <BodySub>
                <div className="center-piece">
                    <h1>Welcome Back!</h1>
                    <Form id={"login"} onSubmit={handleSubmit}>
                        <Message type={message.type} message={message.message} isCentered />
                        <Message type={"notice"} message={"Enter your credentials below to login."} isCentered />
                        <Input
                            id={"email"}
                            type={"email"}
                            placeholder="Email"
                            isRequired={true}
                            onChange={setEmail}
                            value={email}
                            autoComplete={"username"}
                        />
                        <Input
                            id={"password"}
                            type={"password"}
                            placeholder="Password"
                            isRequired={true}
                            onChange={setPassword}
                            value={password}
                            autoComplete={"current-password"}
                        />
                        <Button
                            label={"Login"}
                            type={"submit"}
                        />
                        <ButtonLink
                            label={"I don't have an account"}
                            target={"/register"}
                            buttonLike
                            showIcon={false}
                        />
                        <ButtonLink
                            label={"I forgot my password"}
                            target={"/reset"}
                            buttonLike
                            showIcon={false}
                        />
                    </Form>
                        
                </div>
            </BodySub>
        </>
    );
}
 
export default Login;