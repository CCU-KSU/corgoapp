import { docsDb } from "../db/index.js";

export const getTouSvc = async () => {
    const touData = await docsDb.getTouDb();
    return touData;
};