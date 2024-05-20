import express from "express";
import * as index from "./index.controller.js";

const router = express.Router();

// Routes
router.route("/").get(index.page);

export default router;
