import express from "express";
import { VerifyToken } from "../middleware/verifyToken.js";
import { catalogController } from "../controllers/index.js";

const router = express.Router();

router.get("/", catalogController.getCatalog);
router.get("/:id", catalogController.getCatalogEntry);
router.post("/create", VerifyToken, catalogController.createCatalogEntry);
router.patch("/:id", VerifyToken, catalogController.updateCatalogEntry);
router.delete("/:id", VerifyToken, catalogController.deleteCatalogEntry);

export default router;