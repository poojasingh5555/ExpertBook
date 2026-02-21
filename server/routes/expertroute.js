import express from "express";
import { getExperts, getExpertById, } from "../controllers/Expertscontroller.js";
import { validateGetExperts, validateGetExpertById } from "../middleware/validation.js";
const router = express.Router();

router.get("/", validateGetExperts, getExperts);       // GET /api/experts
router.get("/:id",validateGetExpertById, getExpertById); // GET /api/experts/:id

export default router;