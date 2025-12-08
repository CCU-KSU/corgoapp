import { checklistDb } from "../db/index.js";

export const getAllChecklistsSvc = async () => {
    const checklistData = await checklistDb.getAllChecklistsDb();
    return checklistData;
};

export const getChecklistSvc = async (checklistId) => {
    const checklistData = await checklistDb.getChecklistDb(checklistId);
    return checklistData;
};

export const updateChecklistSvc = async (checklistId, checklistData) => {
    await checklistDb.updateChecklistDb(checklistId, checklistData);
};