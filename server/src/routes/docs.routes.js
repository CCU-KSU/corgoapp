import express from "express";
import { docsController } from "../controllers/index.js";

const router = express.Router();

router.get("/tou", docsController.getTou);

export default router;