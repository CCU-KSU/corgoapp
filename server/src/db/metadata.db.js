import { db } from "../configs/firebase.js";

const METADATA_COLLECTIONS = "metadata";

/**
 * Retrieves a metadata set by its ID.
 * @param {string} id - The ID of the metadata set to retrieve.
 * @returns {Promise<Object>} A promise that resolves with the metadata set data.
 */
export const getMetadataSetDb = async (id) => {
    try {
        const metadataDoc = await db.collection(METADATA_COLLECTIONS).doc(id).get();
        if (!metadataDoc.exists) {
            throw new Error("Metadata set not found.");
        }
        return metadataDoc.data();
    } catch (error) {
        console.error("Error retrieving metadata set from DB:", error);
        throw new Error("Failed to retrieve metadata set.");
    }
};

/**
 * Retrieves all metadata sets as an array of objects with id and setName.
 * @returns {Promise<Array>} A promise that resolves with an array of all metadata sets.
 */
export const getAllMetadataSetsDb = async () => {
    try {
        const snapshot = await db.collection(METADATA_COLLECTIONS).get();
        const metadataSets = [];
        snapshot.forEach(doc => {
            metadataSets.push({
                id: doc.id,
                setName: doc.data().setName || null
            });
        });
        return metadataSets;
    } catch (error) {
        console.error("Error retrieving all metadata sets from DB:", error);
        throw new Error("Failed to retrieve metadata sets.");
    }
};

/**
 * Updates a metadata set by its ID with the provided data.
 * @param {string} docId - The ID of the metadata set to update.
 * @param {object} updatedData - The data to update the metadata set with.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
export const updateMetadataSetDb = async (docId, updatedData) => {
    const metadataRef = db.collection(METADATA_COLLECTIONS).doc(docId);
    try {
        await metadataRef.update({
            setData: updatedData,
            updatedAt: new Date()
        });
    } catch (error) {
        console.error(`Error updating metadata set for doc ${docId}:`, error);
        throw new Error("Failed to update metadata set.");
    }
};