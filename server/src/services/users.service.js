import { usersDb } from "../db/index.js"

export const createProfile = async (uid, email, profileInput) => {
    const role = "basic";
    
    const profileData = {
        email,
        firstName: profileInput.firstName,
        touAgreed: true,
        touAgreedDate: new Date(),
        touAgreedRev: 1,
        role: role
    };

    await usersDb.setCustomUserRoleClaim(uid, role);
    await usersDb.createProfileInDb(uid, profileData);
    
    return { uid, email, role };
};


