import { usersDb } from "../db/index.js"
import { metadataDb } from "../db/index.js";
import { cleanUpdateData } from "../utils/index.js";

export const createProfileSvc = async (uid, email, profileInput) => {
    const role = "basic";
    
    const profileData = {
        email,
        firstName: profileInput.firstName,
        goals: [], 
        checklistProgressCollection: {} || '', 
        devicePlatform: null,
        experienceLvl: null,
        touAgreed: true,
        touAgreedDate: new Date(),
        touAgreedRev: 1,
        role: role
    };

    await usersDb.setCustomUserRoleClaim(uid, role);
    await usersDb.createProfileInDb(uid, profileData);
    
    return { uid, email, role };
};

export const getUserProfileSvc = async (uid) => {
    const rawUserData = await usersDb.getUserProfileDb(uid);

    const platformsObject = await metadataDb.getPlatformsDb();
    const experiencesObject = await metadataDb.getExperiencesDb();

    const devicePlatformCode = rawUserData.devicePlatform;
    const experienceLevelCode = rawUserData.experienceLvl;

    const platformLabel = platformsObject.platforms[devicePlatformCode]?.label || null;
    const experienceLabel = experiencesObject.levels[experienceLevelCode]?.label || null;

    const { 
        devicePlatform,
        experienceLvl, 
        touAgreedRev,
        ...keptUserData 
    } = rawUserData;

    const newUserData = {
        ...keptUserData,
        devicePlatform: platformLabel,
        experienceLvl: experienceLabel,
    };
    
    return newUserData;
};

export const updateProfileSvc = async (uid, email, updatedProfileData) => {
    const newUpdateProfileData = cleanUpdateData(updatedProfileData);
    if (Object.keys(newUpdateProfileData).length === 0) {
        console.log("Update call aborted: No valid fields found in update payload.");
        return await getUserProfileSvc(uid); 
    }

    await usersDb.updateProfileDb(uid, email, newUpdateProfileData);

    return getUserProfileSvc(uid);
};


