import { auth } from "../configs/firebase.js";

export const VerifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await auth.verifyIdToken(token);
        if (decoded) {
            req.user = decoded;
            return next();
        }
    } catch (error) {
        return res.json(
            {
                message: "Denied! Not Authenticated",
            }
        )
    }
};