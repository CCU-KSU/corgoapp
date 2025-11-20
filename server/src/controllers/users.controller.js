import { usersService } from "../services/index.js"

export const createProfile = async (req, res) => {
    const { uid, email } = req.user;
    const { firstName, touAgreement } = req.body;

    if (!firstName || !touAgreement) {
        return res.status(400).json({ 
            message: 'Missing required profile fields.',
        });
    }

    if (!touAgreement) {
        return res.status(400).json({ 
            message: "Missing required TOU Agreement.", 
        })
    }

    try {
        const result = await usersService.createProfile(uid, email, {
            firstName,
        });

        res.status(201).json({ 
            message: 'User profile successfully created and role set.',
            user: result,
        });
    } catch (error) {
        console.error("Profile creation failed:", error);
        res.status(500).json({ 
            message: 'Internal server error during profile creation.',
            error: error.message
        });
    }
};