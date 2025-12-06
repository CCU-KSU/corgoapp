import { catalogService } from "../services/index.js";
import { responseConstructor } from "../utils/index.js";

export const getCatalog = async (req, res) => {
    try {
        const result = await catalogService.getCatalogPagedSvc(req.query);
        
        res.status(200).json(responseConstructor({
            success: true,
            message: "Catalog retrieved.",
            data: result
        }));
    } catch (error) {
        console.error("Error fetching catalog:", error);
        res.status(500).json(responseConstructor({ 
            message: "Internal server error.",
            error: error.message
        }));
    }
};

export const getCatalogEntry = async (req, res) => {
    try {
        const cid = req.params.id;
        const result = await catalogService.getCatalogEntrySvc(cid);
        res.status(200).json(responseConstructor({
            success: true,
            data: result
        }));
    } catch (error) {
        console.error("Error fetching entry:", error);
        res.status(500).json(responseConstructor({ 
            message: "Internal server error.",
            error: error.message
        }));
    }
};

export const createCatalogEntry = async (req, res) => {
    try {
        const entryData = req.body;
        const result =  await catalogService.createCatalogEntrySvc(entryData);
        res.status(201).json(responseConstructor({
            success: true,
            message: "Entry Posted"
        }));
    } catch (error) {
        console.error("Error posting entry:", error);
        res.status(500).json(responseConstructor({ 
            message: "Internal server error.",
            error: error.message
        }));
    }
};

export const updateCatalogEntry = async (req, res) => {
    try {
        const newData = req.body;
        const id = req.params.id;
        const result = await catalogService.updateCatalogEntrySvc(id, newData);
        res.status(200).json(responseConstructor({
            success: true,
            message: "Entry Updated"
        }));
    } catch (error) {
        console.error("Error updating entry:", error);
        res.status(500).json(responseConstructor({ 
            message: "Internal server error.",
            error: error.message
        }));
    }
};

export const deleteCatalogEntry = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await catalogService.deleteCatalogEntrySvc(id);
        res.status(200).json(responseConstructor({
            success: true,
            message: "Entry Deleted"
        }));
    } catch (error) {
        console.error("Error deleting entry:", error);
        res.status(500).json(responseConstructor({ 
            message: "Internal server error.",
            error: error.message
        }));
    }
};
