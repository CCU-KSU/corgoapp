import { docsService } from "../services/index.js";
import { responseConstructor } from "../utils/index.js";

export const getAllDocumentsCtrl = async (req, res) => {
    try {
        const documents = await docsService.getAllDocumentsSvc();
        res.json(responseConstructor({
            success: true,
            data: documents
        }));
    } catch (error) {
        res.status(500).json(responseConstructor({
            success: false,
            message: error.message
        }));
    }
};

export const getDocumentCtrl = async (req, res) => {
    const { docId } = req.params;
    try {
        const document = await docsService.getDocumentSvc(docId);
        res.json(responseConstructor({
            success: true,
            data: document
        }));
    } catch (error) {
        res.status(500).json(responseConstructor({
            success: false,
            message: error.message
        }));
    }
};

export const createDocumentCtrl = async (req, res) => {
    const docData = req.body;
    try {
        await docsService.createDocumentSvc(docData);
        res.json(responseConstructor({
            success: true,
            message: "Document created successfully"
        }));
    } catch (error) {
        res.status(500).json(responseConstructor({
            success: false,
            message: error.message
        }));
    }
};

export const updateDocumentCtrl = async (req, res) => {
    const { docId } = req.params;
    const docData = req.body;
    try {
        await docsService.updateDocSvc(docId, docData);
        res.json(responseConstructor({
            success: true,
            message: "Document updated successfully"
        }));
    } catch (error) {
        res.status(500).json(responseConstructor({
            success: false,
            message: error.message
        }));
    }
};

export const deleteDocumentCtrl = async (req, res) => {
    const { docId } = req.params;
    try {
        await docsService.deleteDocumentSvc(docId);
        res.json(responseConstructor({
            success: true,
            message: "Document deleted successfully"
        }));
    } catch (error) {
        res.status(500).json(responseConstructor({
            success: false,
            message: error.message
        }));
    }
};