import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import BodySub from "../../components/container/BodySub";

import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Link from "../../components/button/Link";
import Notice from "../../components/text/Notice";
import Error from "../../components/text/Error";

const Login = () => {
    
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
			e.preventDefault();
			await login(email, password);
		} catch (error) {
			setError(error.message)
		}
    }

    return (
        <>
            <BodySub>
                <div className="center-piece">
                    <h1>Welcome Back!</h1>
                    <Form id={"login"} onSubmit={handleSubmit}>
                        {error && <Error message={error}/>}
                        <Notice message={"Enter your credentials below to login."}/>
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
                        <Link
                            label={"I don't have an account"}
                            target={"/register"}
                            buttonLike
                        />
                        <Link
                            label={"I forgot my password"}
                            target={"/reset"}
                            buttonLike
                        />
                    </Form>
                        
                </div>
            </BodySub>
        </>
    );
}
 
export default Login;