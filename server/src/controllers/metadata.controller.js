import { metadataService } from "../services/index.js";
import { responseConstructor } from "../utils/index.js";

export const getGoals = async (req, res) => {
    try {
        const data = await metadataService.getGoalsSvc();
        res.status(200).json(responseConstructor({
            success: true,
            message: "Success",
            data: data
        }));
    } catch (error) {
        console.error("Getting Goals failed:", error);
        res.status(500).json(responseConstructor({ 
            message: "Internal server error.",
            error: error.message
        }));
    }
};

export const getPlatforms = async (req, res) => {
    try {
        const data = await metadataService.getPlatformsSvc();
        res.status(200).json(responseConstructor({
            success: true,
            message: "Success",
            data: data
        }));
    } catch (error) {
        console.error("Getting Platforms failed:", error);
        res.status(500).json(responseConstructor({ 
            message: "Internal server error.",
            error: error.message
        }));
    }
};


export const getExperiences = async (req, res) => {
    try {
        const data = await metadataService.getExperiencesSvc();
        res.status(200).json(responseConstructor({
            success: true,
            message: "Success",
            data: data
        }));
    } catch (error) {
        console.error("Getting Platforms failed:", error);
        res.status(500).json(responseConstructor({ 
            message: "Internal server error.",
            error: error.message
        }));
    }
};