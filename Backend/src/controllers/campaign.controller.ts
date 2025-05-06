import { Request, Response } from "express";
import asyncHandler from "express-async-handler"
import Campaign from "../models/campaign.model.js";
import { CampaignStatus } from "../types/types.js";


const normalizeStatus = (status: string): CampaignStatus | null => {
    if (!status) return null;

    const normalizedStatus = status.toLowerCase();
    const statusMap: Record<string, CampaignStatus> = {
        [CampaignStatus.ACTIVE.toLowerCase()]: CampaignStatus.ACTIVE,
        [CampaignStatus.INACTIVE.toLowerCase()]: CampaignStatus.INACTIVE,
        [CampaignStatus.DELETED.toLowerCase()]: CampaignStatus.DELETED
    };

    return statusMap[normalizedStatus] || null;
};


export const getCampaigns = asyncHandler(async (req: Request, res: Response) => {
    const campaigns = await Campaign.find({ status: { $ne: CampaignStatus.DELETED } });
    res.status(200).json(campaigns);
})

export const getCampaignById = asyncHandler(async (req: Request, res: Response) => {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
        res.status(404);
        throw new Error("Campaign not found");
    }
    if (campaign.status === CampaignStatus.DELETED) {
        res.status(404).json({ message: "Campaign not found" })
        return;
    }
    res.status(200).json(campaign);
})

export const createCampaign = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, status, leads, accountIDs } = req.body;
    if (!name || !description) {
        res.status(400);
        throw new Error('Please provide name and description');
    }
    let normalizedStatus = CampaignStatus.ACTIVE;
    if (status) {
        const validStatus = normalizeStatus(status);
        if (validStatus) {
            normalizedStatus = validStatus;
        } else if (status) {
            res.status(400);
            throw new Error('Invalid status. Must be Active or Inactive');
        }
    }
    const campaign = await Campaign.create({
        name,
        description,
        status: normalizedStatus,
        leads: leads || [],
        accountIds: accountIDs || []
    });
    res.status(200).json(campaign);
})


export const updateCampaign = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, status, leads, accountIDs } = req.body;
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
        res.status(404);
        throw new Error("Campaign not found");
    }
    if (campaign.status === CampaignStatus.DELETED) {
        res.status(404);
        throw new Error('Campaign not found');
    }
    campaign.name = name || campaign.name;
    campaign.description = description || campaign.description;
    if (status) {
        const validStatus = normalizeStatus(status);
        if (!validStatus || validStatus === CampaignStatus.DELETED) {
            res.status(400);
            throw new Error('Invalid status. Must be Active or Inactive');
        }
        campaign.status = validStatus;
    }
    campaign.leads = leads || campaign.leads;
    campaign.accountIds = accountIDs || campaign.accountIds;
    const updateCampaign = await campaign.save();
    res.status(200).json(updateCampaign);
})

export const deleteCampaign = asyncHandler(async (req: Request, res: Response) => {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
        res.status(404);
        throw new Error("Campaign not found");
    }
    campaign.status = CampaignStatus.DELETED;
    await campaign.save();
    res.status(200).json({ message: "Campaign deleted successfully" });
})

