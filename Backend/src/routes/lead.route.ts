import express from "express";
import { getAllLeads, getLeadById, searchLeads } from "../controllers/lead.controller.js";

const router = express.Router();

router.get('/leads', getAllLeads);
router.get('/search', searchLeads);
router.get('/:id', getLeadById);

export default router;
