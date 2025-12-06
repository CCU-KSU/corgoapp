import express from "express";
import { docsController } from "../controllers/index.js";
import { VerifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", VerifyToken, docsController.getAllDocumentsCtrl);
router.get("/:docId", docsController.getDocumentCtrl);
router.post("/create", VerifyToken, docsController.createDocumentCtrl);
router.put("/:docId", VerifyToken, docsController.updateDocumentCtrl);
router.delete("/:docId", VerifyToken, docsController.deleteDocumentCtrl);

export default router;