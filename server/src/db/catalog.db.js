import { db } from "../configs/firebase.js";

const CATALOG_COLLECTIONS = "catalog";

/**
 * @typedef {object} ChecklistItem
 * @property {number} order - The order of the checklist item.
 * @property {string} label - The instruction or label for the checklist item.
 * @property {string} details - Additional details, such as a deep link reference.
 */

/**
 * @typedef {object} CatalogEntryData
 * @property {string} name - The display name of the catalog entry (e.g., "WatsApp").
 * @property {string} about - A short, one-line description.
 * @property {string} aboutBig - A detailed description.
 * @property {string} iconRef - A URL reference to the entry's icon.
 * @property {string[]} relatedGoals - A list of goal IDs related to this entry.
 * @property {Object.<string, ChecklistItem>} checklistCollection - A map of checklist item IDs to their data.
 */

export const getCatalogDb = async () => {
    try {
        const catalogSnapshot = await db.collection(CATALOG_COLLECTIONS).select("name", "about").get();

        const catalog = catalogSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return catalog; 
    } catch (error) {
        console.error("Error fetching catalog:", error);
        throw new Error("Failed to fetch catalog.");
    }
};

/**
 * Retrieves a single catalog entry by ID.
 * @param {string} id - The unique ID of the catalog entry.
 * @returns {Promise<CatalogEntryData | null>} A promise that resolves with the entry data or null if not found.
 */
export const getCatalogEntryDb = async (id) => {
    try {
        const entry = await db.collection(CATALOG_COLLECTIONS).doc(id).get()
        return entry.exists ? entry.data() : null;
    } catch (error) {
        console.error("Error fetching entry:", error);
        throw new Error("Failed to fetch entry.");
    }
};

/**
 * Creates a new catalog entry in the database.
 * @param {CatalogEntryData} entryData - The complete data for the new catalog entry.
 * @returns {Promise<string>} A promise that resolves with the ID of the new entry.
 */
export const createCatalogEntryDb = async (entryData) => {
    try {
        const newEntry = await db.collection(CATALOG_COLLECTIONS).add(entryData);
        return newEntry.id;
    } catch (error) {
        console.error("Error posting entry:", error);
        throw new Error("Failed to post entry.");
    }
};

/**
 * Updates an existing catalog entry by ID.
 * @param {string} id - The ID of the entry to update.
 * @param {Partial<CatalogEntryData>} updatedEntryData - The fields to update in the catalog entry.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
export const updateCatalogEntryDb = async (id, updatedEntryData) => {
    try {
        await db.collection(CATALOG_COLLECTIONS).doc(id).update(updatedEntryData);
    } catch (error) {
        console.error("Error updating entry:", error);
        throw new Error("Failed to update entry.");
    } 
};

/**
 * Deletes a catalog entry by ID.
 * @param {string} id - The ID of the entry to delete.
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 */
export const deleteCatalogEntryDb = async (id) => {
    try {
        await db.collection(CATALOG_COLLECTIONS).doc(id).delete();
    } catch (error) {
        console.error("Error deleting entry:", error);
        throw new Error("Failed to delete entry.");
    } 
};