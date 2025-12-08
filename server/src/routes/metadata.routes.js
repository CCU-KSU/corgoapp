import express from "express";
import { metadataController } from "../controllers/index.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Hit!" }));
router.get("/sets/:id", metadataController.getMetadataSet);
router.get("/sets", metadataController.getAllMetadataSets);
router.put("/sets/:id", metadataController.updateMetadataSet);

export default router;