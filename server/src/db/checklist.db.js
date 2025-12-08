import { db } from "../configs/firebase.js";

const CHECKLIST_COLLECTION = "checklist";

/**
 * @typedef {object} ChecklistItem
 * @property {number} order - The order of the checklist item.
 * @property {string} label - The instruction or label for the checklist item.
 * @property {string} details - Additional details, such as a deep link reference.
 */

/**
 * @typedef {object} ChecklistData
 * @property {Object.<string, ChecklistItem>} items - A map of checklist item IDs to their data.
 */

export const getAllChecklistsDb = async () => {
    try {
        const snapshot = await db.collection(CHECKLIST_COLLECTION).get();
        const checklists = [];
        snapshot.forEach(doc => {
            checklists.push({
                id: doc.id,
                name: doc.data().name || null
            });
        });
        return checklists;
    } catch (error) {
        console.error("Error retrieving all checklists from DB:", error);
        throw new Error("Failed to retrieve checklists.");
    } 
};

/**
 * Fetches the checklist data for a given checklist ID.
 * @param {string} checklistId - The ID of the checklist to fetch.
 * @returns {Promise<ChecklistData>} A promise that resolves with the checklist data.
 */
export const getChecklistDb = async (checklistId) => {
    try {
        const checklistDoc = await db.collection(CHECKLIST_COLLECTION).doc(checklistId).get();
        if (!checklistDoc.exists) {
            throw new Error("Checklist not found.");
        }
        return checklistDoc.data();
    } catch (error) {
        console.error("Error fetching checklist:", error);
        throw new Error("Failed to fetch checklist.");
    }
};

/**
 * Updates the checklist data for a given checklist ID.
 * @param {string} checklistId - The ID of the checklist to update.
 * @param {Partial<ChecklistData>} updatedData - The fields to update in the checklist.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
export const updateChecklistDb = async (checklistId, updatedData) => {
    const checklistRef = db.collection(CHECKLIST_COLLECTION).doc(checklistId);
    try {
        await checklistRef.update({
            items: updatedData,
            updatedAt: new Date()
        });
    } catch (error) {
        console.error("Error updating checklist:", error);
        throw new Error("Failed to update checklist.");
    }
};