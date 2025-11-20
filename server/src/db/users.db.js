import { db, auth } from "../configs/firebase.js";

const USERS_COLLECTION = "users";

/**
 * Sets a custom role claim on the Firebase Auth user.
 * This claim is embedded in the user's ID token and is used for access control.
 * @param {string} uid - The Firebase User ID (UID).
 * @param {string} role - The role string ('normal' or 'manager').
 */
export const setCustomUserRoleClaim = async (uid, role) => {
    const claims = { role: role };
    try {
        await auth.setCustomUserClaims(uid, claims);
        console.log(`Custom role claim set for user ${uid}: ${role}`);
    } catch (error) {
        console.error("Error setting custom user claims:", error);
        throw new Error("Failed to set user role claim.");
    }
};

/**
 * Creates a new user profile document in the 'users' collection.
 * It initializes all required fields based on your fb.json structure.
 * @param {string} uid - The Firebase User ID (UID).
 * @param {object} profileData - The essential data from the request body.
 * @param {string} role - The role to save in the document (should match the claim).
 */
export const createProfileInDb = async (uid, profileData) => {
    const defaultProfile = {
        email: profileData.email,
        firstName: profileData.firstName || '', 
        goals: [], 
        checklistProgressCollection: {}, 
        devicePlatform: null,
        experienceLvl: null,
        touAgreed: profileData.touAgreed,
        touAgreedDate: profileData.touAgreedDate,
        touAgreedRev: profileData.touAgreedRev,
        role: profileData.role
    };

    const profileRef = db.collection(USERS_COLLECTION).doc(uid);
    await profileRef.set(defaultProfile);
};