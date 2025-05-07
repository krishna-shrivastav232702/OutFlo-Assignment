import Lead from "../models/lead.js";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getAllLeads = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const totalLeads = await Lead.countDocuments();
    const leads = await Lead.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
        
    res.status(200).json({
        success: true,
        count: totalLeads,
        totalPages: Math.ceil(totalLeads / limit),
        currentPage: page,
        data: leads
    });
});

export const getLeadById = asyncHandler(async (req: Request, res: Response) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        res.status(404).json({
            success: false,
            error: 'Lead not found'
        });
        return;
    }

    res.status(200).json({
        success: true,
        data: lead
    });
});

export const searchLeads = asyncHandler(async (req: Request, res: Response) => {
    const url = req.query.url as string;
    
    if (!url) {
        res.status(400).json({
            success: false,
            error: 'Search URL is required'
        });
        return;
    }
    
    const urlObj = new URL(url);
    const keywords = urlObj.searchParams.get('keywords') || '';
    const titleFreeText = urlObj.searchParams.get('titleFreeText') || '';
    
    const searchQuery: any = {};
    
    if (keywords) {
        searchQuery.$or = [
            { companyName: { $regex: keywords, $options: 'i' } },
            { jobTitle: { $regex: keywords, $options: 'i' } }
        ];
    }
    
    if (titleFreeText) {
        searchQuery.jobTitle = { $regex: titleFreeText, $options: 'i' };
    }
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const totalLeads = await Lead.countDocuments(searchQuery);
    
    const leads = await Lead.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
        
    res.status(200).json({
        success: true,
        count: totalLeads,
        totalPages: Math.ceil(totalLeads / limit),
        currentPage: page,
        data: leads
    });
});