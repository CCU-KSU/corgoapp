import { db } from "../configs/firebase.js";

const METADATA_COLLECTIONS = "metadata";

/**
 * Retrieves Goals List
 */
export const getGoalsDb = async () => {
    const goalsRef = db.collection(METADATA_COLLECTIONS).doc("master_goals");
    try {
        const goals = await goalsRef.get();
        if (!goals.exists || !goals.data()) {
            throw new Error("Master goals document not found or empty.");
        }
        return goals.data(); 
    } catch (error) {
        console.error("Error retrieving goals from metadata DB:", error);
        throw new Error("Failed to retrieve goals data.");
    }
};

/**
 * Retrieves Platforms List
 */
export const getPlatformsDb = async () => {
    const platformsRef = db.collection(METADATA_COLLECTIONS).doc("master_platforms");
    try {
        const platforms = await platformsRef.get();
        if (!platforms.exists || !platforms.data()) {
            throw new Error("Master platforms document not found or empty.");
        }
        return platforms.data(); 
    } catch (error) {
        console.error("Error retrieving platforms from metadata DB:", error);
        throw new Error("Failed to retrieve platforms data.");
    } 
};

/**
 * Retrieves Experiences List
 */
export const getExperiencesDb = async () => {
    const experiencesRef = db.collection(METADATA_COLLECTIONS).doc("master_experience_level");
    try {
        const experiences = await experiencesRef.get();
        if (!experiences.exists || !experiences.data()) {
            throw new Error("Master experience level document not found or empty.");
        }
        return experiences.data(); 
    } catch (error) {
        console.error("Error retrieving experiences from metadata DB:", error);
        throw new Error("Failed to retrieve experience data.");
    } 
};