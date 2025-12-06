import { db } from "../configs/firebase.js";

const DOCUMENTS_COLLECTIONS = "documents";

export const getAllDocumentsDb = async () => {
    try {
        const snapshot = await db.collection(DOCUMENTS_COLLECTIONS).get();
        const documents = [];
        snapshot.forEach(doc => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
    } catch (error) {
        console.error("Error fetching all documents:", error);
        throw new Error("Failed to fetch documents.");
    }
};

export const getDocumentDb = async (docId) => {
    try {
        const doc = await db.collection(DOCUMENTS_COLLECTIONS).doc(docId).get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        console.error("Error fetching document:", error);
        throw new Error("Failed to fetch document.");
    }
};

export const createDocumentDb = async (docId, docData) => {
    try {
        await db.collection(DOCUMENTS_COLLECTIONS).doc(docId).set(docData);
    } catch (error) {
        console.error("Error creating document:", error);
        throw new Error("Failed to create document.");
    }
};

export const updateDocumentDb = async (docId, docData) => {
    try {
        await db.collection(DOCUMENTS_COLLECTIONS).doc(docId).set(docData, { merge: true });
    } catch (error) {
        console.error("Error updating document:", error);
        throw new Error("Failed to update document.");
    }
};

export const deleteDocumentDb = async (docId) => {
    try {
        await db.collection(DOCUMENTS_COLLECTIONS).doc(docId).delete();
    } catch (error) {
        console.error("Error deleting document:", error);
        throw new Error("Failed to delete document.");
    }
};