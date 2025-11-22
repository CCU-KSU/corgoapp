import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../configs/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider,deleteUser } from 'firebase/auth';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const [isAuthenticating, setIsAuthenticating] = useState(true)

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const reauthenticateUser = (email, password) => {
        const credential = EmailAuthProvider.credential(email, password);
        return reauthenticateWithCredential(currentUser, credential);
    }

    const updateUserPassword = (newPassword) => {
        return updatePassword(currentUser, newPassword);
    }

    const deleteUserAccount = () => {
        return deleteUser(currentUser);
    }

    // // Moved to LoadingGate component

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
        register,
        logout,
        resetPassword,
        reauthenticateUser,
        updateUserPassword,
        deleteUserAccount,
        isAuthenticating
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}