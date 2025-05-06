import express, { Router } from "express";
import { createCampaign, deleteCampaign, getCampaignById, getCampaigns, updateCampaign } from "../controllers/campaign.controller.js";


const router:Router = express.Router();

router.post('/campaigns', createCampaign);
router.get('/campaigns', getCampaigns);
router.get("/campaigns/:id", getCampaignById);
router.put("/campaigns/:id", updateCampaign);
router.delete("/campaigns/:id", deleteCampaign);

export default router;
