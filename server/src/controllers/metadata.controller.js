import e from "express";
import { metadataService } from "../services/index.js";
import { responseConstructor } from "../utils/index.js";

export const getMetadataSet = async (req, res) => {
    const id = req.params.id;
    const asArray = req.query.asArray === 'true';
    const sortBy = req.query.sortBy || 'order';
    const desc = req.query.desc === 'true';

    console.log(`getMetadataSet called with id: ${id}, asArray: ${asArray}, sortBy: ${sortBy}, desc: ${desc}`);
    

    try {
        const data = await metadataService.getMetadataSetSvc(id, asArray, sortBy, desc);
        res.status(200).json(responseConstructor({
            success: true,
            message: "Success",
            data: data
        }));
    } catch (error) {
        console.error("Getting Metadata Set failed:", error);
        res.status(500).json(responseConstructor({ 
            message: "Internal server error.",
            error: error.message
        }));
    }
};

export const getAllMetadataSets = async (req, res) => {
    try {
        const data = await metadataService.getAllMetadataSetsSvc();
        res.status(200).json(responseConstructor({
            success: true,
            message: "Success",
            data: data
        }));
    } catch (error) {
        console.error("Getting All Metadata Sets failed:", error);
        res.status(500).json(responseConstructor({
            message: "Internal server error.",
            error: error.message
        }));
    }
};

export const updateMetadataSet = async (req, res) => {
    const id = req.params.id;
    const setData = req.body.setData;

    try {
        await metadataService.updateMetadataSetSvc(id, setData);
        res.status(200).json(responseConstructor({
            success: true,
            message: "Metadata set updated successfully."
        }));
    } catch (error) {
        console.error("Updating Metadata Set failed:", error);
        res.status(500).json(responseConstructor({
            message: "Internal server error.",
            error: error.message
        }));
    }
};