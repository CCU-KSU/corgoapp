import { catalogDb } from "../db/index.js";
import { transformCollectionToArray } from "../utils/index.js";

export const getCatalogSvc = async () => {
    const catalogRaw = await catalogDb.getCatalogDb();
    
    return catalogRaw;
};

export const getCatalogPagedSvc = async (index) => {
    const indexTimestamp = index ? parseInt(index) : null;    

    const catalogPageRaw = await catalogDb.getCatalogPagedDb(indexTimestamp);

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

export const updateCatalogEntrySvc = async () => {
    // 
};

export const deleteCatalogEntrySvc = async () => {
    // 
};