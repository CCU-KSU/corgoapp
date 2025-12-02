import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../configs/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const [isAuthenticating, setIsAuthenticating] = useState(true)

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    // // Moved to LoadingGate

    // const delay = (ms) => {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // };

    // useEffect(() => {
    //     const MIN_DELAY_MS = 300;

    //     const observe = auth.onAuthStateChanged(async (user) => {
    //         setCurrentUser(user);
    //         await delay(MIN_DELAY_MS);
    //         setIsAuthenticating(false);
    //     });
    //     return observe
    // }, []);

    useEffect(() => {
        const observe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            setIsAuthenticating(false);
        });
        return observe
    }, []);

    const value = {
        currentUser,
        login,
        logout,
        isAuthenticating
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}