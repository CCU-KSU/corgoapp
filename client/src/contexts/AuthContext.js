import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../configs/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const [isAuthenticating, setIsAuthenticating] = useState(true)

    const register = (email, password) => {
        setIsAuthenticating(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        setIsAuthenticating(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        setIsAuthenticating(true);
        return signOut(auth);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    useEffect(() => {
        const MIN_DELAY_MS = 300;

        const observe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            await delay(MIN_DELAY_MS);
            setIsAuthenticating(false);
        });
        return observe
    }, []);

    const value = {
        currentUser,
        login,
        register,
        logout,
        resetPassword,
        isAuthenticating
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}