import { checklistService } from "../services/index.js";
import { responseConstructor } from "../utils/index.js";

export const getChecklistCtrl = async (req, res) => {
    const checklistId = req.params.checklistId;
    try {
        const checklistData = await checklistService.getChecklistSvc(checklistId);
        res.status(200).json(responseConstructor({
            success: true,
            data: checklistData
        }));
    } catch (error) {
        res.status(500).json(responseConstructor({
            success: false,
            message: "Error retrieving checklist",
            error: error.message
        }));
    }
};

export const updateChecklistCtrl = async (req, res) => {
    const checklistId = req.params.checklistId;
    const checklistData = req.body;
    try {
        await checklistService.updateChecklistSvc(checklistId, checklistData);
        res.status(200).json(responseConstructor({
            success: true,
            message: "Checklist updated successfully"
        }));
    } catch (error) {
        res.status(500).json(responseConstructor({
            success: false,
            message: "Error updating checklist",
            error: error.message
        }));
    }
};