import { auth } from "../configs/firebase.js";
import { responseConstructor } from "../utils/index.js";

export const VerifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await auth.verifyIdToken(token);
        if (decoded) {
            req.user = decoded;
            return next();
        }
    } catch (error) {
        return res.status(401).json(responseConstructor({
            success: false,
            message: "Unauthorized access.",
            error: error.message
        }));
    }
};