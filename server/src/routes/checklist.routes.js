import express from "express";
import { VerifyToken } from "../middleware/verifyToken.js";
import { checklistController } from "../controllers/index.js";

const router = express.Router();

router.get("/:checklistId", checklistController.getChecklistCtrl);
router.put("/:checklistId", VerifyToken, checklistController.updateChecklistCtrl);

export default router;