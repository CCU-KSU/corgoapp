import express from "express";
import { metadataController } from "../controllers/index.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Hit!" }));
router.get("/goals", metadataController.getGoals);
router.get("/platforms", metadataController.getPlatforms);
router.get("/experiences", metadataController.getExperiences);

export default router;