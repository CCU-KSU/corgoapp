import { usersService } from "../services/index.js"

export const createProfile = async (req, res) => {
    const { uid, email } = req.user;
    const { firstName, touAgreement } = req.body;

    if (!firstName || !touAgreement) {
        return res.status(400).json({ 
            message: "Missing required profile fields.",
        });
    }

    if (!touAgreement) {
        return res.status(400).json({ 
            message: "Missing required TOU Agreement.", 
        })
    }

    try {
        const result = await usersService.createProfileSvc(uid, email, {
            firstName,
        });

        res.status(201).json({ 
            message: "User profile successfully created and role set.",
            user: result,
        });
    } catch (error) {
        console.error("Profile creation failed:", error);
        res.status(500).json({ 
            message: "Internal server error during profile creation.",
            error: error.message
        });
    }
};

export const getProfile = async (req, res) => {
    const { uid } = req.user;
    try {
        const result = await usersService.getUserProfileSvc(uid);
        res.status(200).json(result);
    } catch (error) {
        console.error("Getting Profile failed:", error);
        res.status(500).json({ 
            message: "Internal server error.",
            error: error.message
        });
    }
};

export const updateProfile = async (req, res) => {
    const { uid, email } = req.user;
    const update = req.body;

    try {
        const result = await usersService.updateProfileSvc(uid, email, update);
        res.status(201).json({ 
            message: "User profile successfully created and role set.",
            user: result,
        });
    } catch (error) {
        console.error("Updating Profile failed:", error);
        res.status(500).json({ 
            message: "Internal server error.",
            error: error.message
        });
    }
};