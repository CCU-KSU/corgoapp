import express from "express";
import { VerifyToken } from "../middleware/verifyToken.js";
import { checklistController } from "../controllers/index.js";

const router = express.Router();

router.get("/", checklistController.getAllChecklistsCtrl);
// router.post("/create", VerifyToken, checklistController.createChecklistCtrl);
router.get("/:checklistId", checklistController.getChecklistCtrl);
router.put("/:checklistId", VerifyToken, checklistController.updateChecklistCtrl);

export default router;