import { metadataService } from "../services/index.js";

export const getGoals = async (req, res) => {
    try {
        const result = await metadataService.getGoalsSvc();
        res.status(200).json(result);
    } catch (error) {
        console.error("Getting Goals failed:", error);
        res.status(500).json({ 
            message: "Internal server error.",
            error: error.message
        });
    }
};

export const getPlatforms = async (req, res) => {
    try {
        const result = await metadataService.getPlatformsSvc();
        res.status(200).json(result);
    } catch (error) {
        console.error("Getting Platforms failed:", error);
        res.status(500).json({ 
            message: "Internal server error.",
            error: error.message
        });
    }
};


export const getExperiences = async (req, res) => {
    try {
        const result = await metadataService.getExperiencesSvc();
        res.status(200).json(result);
    } catch (error) {
        console.error("Getting Platforms failed:", error);
        res.status(500).json({ 
            message: "Internal server error.",
            error: error.message
        });
    }
};