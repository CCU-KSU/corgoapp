import { auth } from "../configs/firebase.js";
import { usersDb } from "../db/index.js"
import { metadataDb } from "../db/index.js";
import { cleanUpdateData } from "../utils/index.js";

export const createProfileSvc = async (uid, email, profileInput) => {
    const role = "basic";
    
    const profileData = {
        email,
        firstName: profileInput.firstName,
        goals: [], 
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

    const platformsObject = await metadataDb.getMetadataSetDb("platforms");
    const experiencesObject = await metadataDb.getMetadataSetDb("level");

    const devicePlatformCode = rawUserData.devicePlatform;
    const experienceLevelCode = rawUserData.experienceLvl;

    const platformLabel = platformsObject.setData[devicePlatformCode]?.label || null;
    const experienceLabel = experiencesObject.setData[experienceLevelCode]?.label || null;

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

export const updateProfileSvc = async (user, updatedProfileData) => {
    const { uid, email } = user;
    const newUpdateProfileData = cleanUpdateData(updatedProfileData);
    if (Object.keys(newUpdateProfileData).length === 0) {
        console.log("Update call aborted: No valid fields found in update payload.");
        return await getUserProfileSvc(uid); 
    }

    await usersDb.updateProfileDb(uid, email, newUpdateProfileData);    

    const originalEmail = email

    if (updatedProfileData.email) {
        try {
            await auth.updateUser(uid, {
                email: updatedProfileData.email,
            });
            console.log(`Firebase Auth email successfully updated for user ${uid}.`);
        } catch (error) {
            console.error("Error updating Firebase Auth email:", error);
            if (originalEmail) {
                await profileRef.update({ email: originalEmail });
                console.log(`Firestore email for user ${uid} reverted to ${originalEmail} due to Auth failure.`);
            }
        }
    }

    return getUserProfileSvc(uid);
};

export const updateChecklistItemStatusSvc = async (uid, checklistId, itemPath, status) => {

    console.log("Updating checklist item status:", { uid, checklistId, itemPath, status });
    
    
    if (!uid || !checklistId || !itemPath || typeof status !== 'boolean') {
        throw new Error("Invalid parameters provided for updating checklist item status.");
    }

    const pathSegments = itemPath.split('.').filter(Boolean);

    const nested = {};
    let cursor = nested;

    for (let i = 0; i < pathSegments.length; i++) {
        const seg = pathSegments[i];
        const isLast = i === pathSegments.length - 1;

        if (isLast) {
            cursor[seg] = { completed: status };
        } else {
            // ensure an intermediate node exists with a subItems map
            cursor[seg] = { completed: false, subItems: {} };
            cursor = cursor[seg].subItems;
        }
    }

    const updateData = { progress: nested };

    await usersDb.updateChecklistItemStatusDb(uid, checklistId, updateData);
};

export const getChecklistProgressSvc = async (uid, checklistId) => {
    if (!uid || !checklistId) {
        throw new Error("Invalid parameters provided for fetching checklist progress.");
    }
    
    const progressData = await usersDb.getChecklistProgressDb(uid, checklistId);
    return progressData;
}