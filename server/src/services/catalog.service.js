import { catalogDb } from "../db/index.js";
import { transformCollectionToArray } from "../utils/index.js";

export const getCatalogSvc = async () => {
    const catalogRaw = await catalogDb.getCatalogDb();
    
    return catalogRaw;
};

export const getCatalogPagedSvc = async (query) => {
    const indexTimestamp = query.index ? parseInt(query.index) : null; 
    
    const goalsFilter = query.goals ? query.goals.split(',') : null;

    let catalogPageRaw;

    if (goalsFilter && goalsFilter.length > 0) {
        catalogPageRaw = await catalogDb.getCatalogRecommendationsPagedDb(goalsFilter, indexTimestamp);
    } else {
        catalogPageRaw = await catalogDb.getCatalogPagedDb(indexTimestamp);
    }

    const nextIndexRaw = catalogPageRaw.length ? catalogPageRaw.at(-1).written : null;
    const nextIndex = nextIndexRaw ? nextIndexRaw.toString() : null;
    
    let more = false;

    if (nextIndex !== null) {
        const nextCatalogPageRaw = await catalogDb.getCatalogPagedDb(nextIndexRaw);
        if (nextCatalogPageRaw.length) {
            more = true;
        }
    }

    return {catalogPageRaw, nextIndex, more}; 
};

export const getCatalogEntrySvc = async (id) => {
    const catalogEntry = await catalogDb.getCatalogEntryDb(id);
    return catalogEntry;
};

export const createCatalogEntrySvc = async (entryData) => {
    const timeNow = Date.now();
    
    const trueEntryData = {
        ...entryData,
        written: timeNow,
        edited: timeNow
    }
    
    await catalogDb.createCatalogEntryDb(trueEntryData);
};

export const updateCatalogEntrySvc = async (id, newData) => {
    const timeNow = Date.now();
    
    const trueNewData = {
        ...newData,
        edited: timeNow
    };

    await catalogDb.updateCatalogEntryDb(id, trueNewData);
};

export const deleteCatalogEntrySvc = async (id) => {
    await catalogDb.deleteCatalogEntryDb(id); 
};