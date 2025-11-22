import { metadataDb } from "../db/index.js";
import { transformCollectionToArray } from "../utils/index.js";

export const getGoalsSvc = async () => {
    const data = await metadataDb.getGoalsDb();

    const goalsObject = data.goals;
    const goalsArray = transformCollectionToArray(goalsObject, 'label');

    return goalsArray;
};

export const getPlatformsSvc = async () => {
    const data = await metadataDb.getPlatformsDb();

    const platformsObject = data.platforms;
    const platformsArray = transformCollectionToArray(platformsObject, 'label');

    return platformsArray;
};

export const getExperiencesSvc = async () => {
    const data = await metadataDb.getExperiencesDb();

    const experiencesObject = data.levels;
    const experiencesArray = transformCollectionToArray(experiencesObject, 'pos');

    return experiencesArray;
};