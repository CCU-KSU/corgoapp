import { docsService } from "../services/index.js";
import { responseConstructor } from "../utils/index.js";

export const getTou = async (req, res) => {
    try {
        const touData = await docsService.getTouSvc();
        res.status(200).json(responseConstructor({
            success: true,
            message: "Terms of Use retrieved.",
            data: touData
        }));
    } catch (error) {
        console.error("Error fetching Terms of Use:", error);
        res.status(500).json(responseConstructor({
            success: false,
            message: "Internal server error.",
            error: error.message
        }));
    }
};
