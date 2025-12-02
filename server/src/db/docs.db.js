import { db } from "../configs/firebase.js";

const DOCUMENTS_COLLECTIONS = "documents";

export const getTouDb = async () => {
    try {
        const touDoc = await db.collection(DOCUMENTS_COLLECTIONS).doc("tou").get();
        return touDoc.exists ? touDoc.data() : null;
    } catch (error) {
        console.error("Error fetching TOU:", error);
        throw new Error("Failed to fetch TOU.");
    }
};

export const updateTouDb = async (touData) => {
    try {
        await db.collection(DOCUMENTS_COLLECTIONS).doc("tou").set(touData);
    } catch (error) {
        console.error("Error updating TOU:", error);
        throw new Error("Failed to update TOU.");
    }
};