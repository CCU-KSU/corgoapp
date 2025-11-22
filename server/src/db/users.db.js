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
 * @param {string} uid
 * @param {object} profileData
 * @param {string} role 
 */
export const createProfileInDb = async (uid, defaultProfileData) => {
    const profileRef = db.collection(USERS_COLLECTION).doc(uid);
    await profileRef.set(defaultProfileData);
};

/**
 * Retrieves profile data from the 'users' collection.
 * @param {string} uid - The Firebase User ID (UID).
 */
export const getUserProfileDb = async (uid) => {
    const profileRef = db.collection(USERS_COLLECTION).doc(uid);
    const profileData = await profileRef.get();
    return profileData.data();
};

/**
 * Updates a user profile based on provided data
 * @param {string} uid
 * @param {object} updatedProfileData
 */
export const updateProfileDb = async (uid, email, updatedProfileData) => {
    const profileRef = db.collection(USERS_COLLECTION).doc(uid);
    await profileRef.update(updatedProfileData);

    const originalEmail = email


    if (updatedProfileData.email) {
        try {
            await auth.updateUser(uid, {
                email: updatedProfileData.email,
            });
            console.log(`Firebase Auth email successfully updated for user ${uid}.`);
        } catch (error) {
            console.error("Error updating Firebase Auth email:", error);
            if (originalEmail) {
                await profileRef.update({ email: originalEmail });
                console.log(`Firestore email for user ${uid} reverted to ${originalEmail} due to Auth failure.`);
            }
        }
    }
};
