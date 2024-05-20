import express from "express";
import * as openai from "./openai.controller.js";

const router = express.Router();

// Routes
router.route("/normal").get(openai.pagesNormal);
router.route("/sse").get(openai.pagesSse);
router.route("/normal").post(openai.normal);
router.route("/sse").post(openai.sse);

export default router;
