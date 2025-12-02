import { catalogService } from "../services/index.js";
import { responseConstructor } from "../utils/index.js";

export const getCatalog = async (req, res) => {
    try {
        let result;
        if (req.query.index) {
            result = await catalogService.getCatalogPagedSvc(req.query.index)
        } else {
            result = await catalogService.getCatalogSvc()
        }
        
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
    // 
};

export const deleteCatalogEntry = async (req, res) => {
    // 
};
