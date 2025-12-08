import { metadataDb } from "../db/index.js";
import { transformCollectionToArray } from "../utils/index.js";

export const getMetadataSetSvc = async (id, asArray, sortBy, decd) => {
    let data = await metadataDb.getMetadataSetDb(id);
    if (asArray) {
        const setDataObject = data.setData;
        const setDataArray = transformCollectionToArray(setDataObject, sortBy, decd);
        data.setData = setDataArray;
    }
    return data;
};

export const getAllMetadataSetsSvc = async () => {
    const data = await metadataDb.getAllMetadataSetsDb();
    return data;
}

export const updateMetadataSetSvc = async (id, setData) => {
    await metadataDb.updateMetadataSetDb(id, setData);
};