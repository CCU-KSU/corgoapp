import express from "express";
import { VerifyToken } from "../middleware/verifyToken.js";
import { usersController } from "../controllers/index.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Hit!" }));
router.post("/register", VerifyToken, usersController.createProfile);
router.get("/profile", VerifyToken, usersController.getProfile);
router.patch("/profile-update", VerifyToken, usersController.updateProfile)
router.patch("/mark-checklist-progress", VerifyToken, usersController.updateChecklistItemStatus);
router.get("/checklist-progress/:checklistId", VerifyToken, usersController.getChecklistProgress);

export default router;