import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import Button from "../components/button/Button";
import Link from "../components/button/Link";

import LoadingGate from "../components/effect/LoadingGate";

const Catalog = () => {
    const { currentUser, logout } = useAuth();
    const [loadingState, setLoadingState] = useState(true);

    const handleLogout = async () => {
		try {
			await logout()
		} catch (error) {
			alert("Failed to logout!");
		}
	}

    useEffect(() => {
        const delay = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };

        const finishLoading = async () => {
            const seconds = 3;
            const time = (seconds * 1000);
            await delay(time);
            setLoadingState(false);
        };

        if (loadingState) {
            finishLoading()
        }
    }, [loadingState]);

    const reset = () => {
        setLoadingState(true);
    };
    
    return (
        <>           
            <Button
                label="Reset"
                action={reset}
            />
            <div>
                <LoadingGate isLoading={loadingState}>
                    <h1>Loaded</h1>
                </LoadingGate>
            </div>
            {currentUser ? (
                <Button
                    label="Logout"
                    action={handleLogout}
                />
            ) : (
                <Link label={'Login'} target={"/login"} buttonLike/>
            )}
        </>
    );
}
 
export default Catalog;