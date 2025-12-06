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
 */
export const createProfileInDb = async (uid, defaultProfileData) => {
    const profileRef = db.collection(USERS_COLLECTION).doc(uid);
    try {
        await profileRef.set(defaultProfileData);
    } catch (error) {
        console.error(`Error creating profile in DB for user ${uid}:`, error);
        throw new Error("Failed to create user profile in database.");
    }
};

/**
 * Retrieves profile data from the 'users' collection.
 * @param {string} uid - The Firebase User ID (UID).
 */
export const getUserProfileDb = async (uid) => {
    const profileRef = db.collection(USERS_COLLECTION).doc(uid);
    try {
        const profileData = await profileRef.get();
        if (!profileData.exists) {
            throw new Error(`Profile not found for UID: ${uid}`);
        }
        return profileData.data();
    } catch (error) {
        console.error(`Error retrieving profile in DB for user ${uid}:`, error);
        throw new Error("Failed to retrieve user profile from database.");
    }
};

/**
 * Updates a user profile based on provided data
 * @param {string} uid
 * @param {object} updatedProfileData
 */
export const updateProfileDb = async (uid, email, updatedProfileData) => {
    const profileRef = db.collection(USERS_COLLECTION).doc(uid);
    try {
        await profileRef.update(updatedProfileData);
    } catch (error) {
        console.error(`Error updating profile in DB for user ${uid}:`, error);
        throw new Error("Failed to update user profile in database.");
    }
};

/**
 * Updates the status of a checklist item for a user.
 * @param {string} uid - The Firebase User ID (UID).
 * @param {string} checklistId - The ID of the checklist.
 * @param {string} itemPath - The path to the specific checklist item.
 * @param {boolean} status - The new status of the checklist item.
 */

export const updateChecklistItemStatusDb = async (uid, checklistId, updateData) => {
    const progressRef = db
        .collection(USERS_COLLECTION)
        .doc(uid)
        .collection("checklistProgress")
        .doc(checklistId);

    try {
        await progressRef.set(updateData, { merge: true });
    } catch (error) {
        console.error(`Error updating checklist item status in DB for user ${uid}:`, error);
        throw new Error("Failed to update checklist item status in database.");
    }
};

/**
 * Retrieves the progress document for a specific checklist for a user.
 * @param {string} uid - The Firebase User ID (UID).
 * @param {string} checklistId - The ID of the checklist (e.g., "onboarding").
 * @returns {Promise<object | null>} The checklist progress data (Map), or null if the document doesn't exist.
 */
export const getChecklistProgressDb = async (uid, checklistId) => {
    const progressRef = db
        .collection(USERS_COLLECTION)
        .doc(uid)
        .collection("checklistProgress")
        .doc(checklistId);

    try {
        const docSnapshot = await progressRef.get();
        
        if (!docSnapshot.exists) {
            return {};
        }

        // Returns the data object, which contains the nested 'progress' Map.
        return docSnapshot.data();

    } catch (error) {
        console.error(`Error retrieving checklist progress for user ${uid}:`, error);
        throw new Error("Failed to retrieve checklist progress from database.");
    }
};
