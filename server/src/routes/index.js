import express from "express";

import catalogRoutes from "./catalog.routes.js";
import usersRoutes from "./users.routes.js";
import metadataRoutes from "./metadata.routes.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Hit!" }));
router.use("/catalog", catalogRoutes);
router.use("/users", usersRoutes);
router.use("/metadata", metadataRoutes); 

export default router;