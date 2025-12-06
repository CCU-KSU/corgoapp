import { docsDb } from "../db/index.js";

export const getAllDocumentsSvc = async () => {
    const documents = await docsDb.getAllDocumentsDb();
    return documents;
}

export const getDocumentSvc = async (docId) => {
    const document = await docsDb.getDocumentDb(docId);
    return document;
};

export const createDocumentSvc = async (docData) => {

    const { docId, docName, docContent } = docData;

    if (!docId || !docName || !docContent) {
        throw new Error("Document ID, name, and body must be provided.");
    }

    const existingDoc = await docsDb.getDocumentDb(docId);
    if (existingDoc) {
        throw new Error("Document with the given ID already exists.");
    }

    const trueDocData = {
        name: docName,
        content: docContent,
        updatedAt: new Date(),
        revision: 1
    }
    
    await docsDb.createDocumentDb(docId, trueDocData);
};

export const updateDocSvc = async (docId, docData) => {
    const { docName, docContent } = docData;

    if (!docId || !docName || !docContent) {
        throw new Error("Document ID, name, and body must be provided.");
    }

    const existingDoc = await docsDb.getDocumentDb(docId);
    if (!existingDoc) {
        throw new Error("Document with the given ID does not exist.");
    }

    const trueDocData = {
        name: docName,
        content: docContent,
        updatedAt: new Date(),
        revision: existingDoc && existingDoc.revision ? existingDoc.revision + 1 : 1
    }

    await docsDb.updateDocumentDb(docId, trueDocData);
};

export const deleteDocumentSvc = async (docId) => {
    const existingDoc = await docsDb.getDocumentDb(docId);
    if (!existingDoc) {
        throw new Error("Document with the given ID does not exist.");
    }
    await docsDb.deleteDocumentDb(docId);
};