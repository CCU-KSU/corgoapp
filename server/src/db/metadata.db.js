import { db } from "../configs/firebase.js";

const METADATA_COLLECTIONS = "metadata";

/**
 * Retrieves Goals List
 */
export const getGoalsDb = async () => {
    const goalsRef = db.collection(METADATA_COLLECTIONS).doc("master_goals");
    const goals = await goalsRef.get();
    return goals.data(); 
};

/**
 * Retrieves Platforms List
 */
export const getPlatformsDb = async () => {
    const platformsRef = db.collection(METADATA_COLLECTIONS).doc("master_platforms");
    const platforms = await platformsRef.get();
    return platforms.data(); 
};

/**
 * Retrieves Experiences List
 */
export const getExperiencesDb = async () => {
    const experiencesRef = db.collection(METADATA_COLLECTIONS).doc("master_experience_level");
    const experiences = await experiencesRef.get();
    return experiences.data(); 
};