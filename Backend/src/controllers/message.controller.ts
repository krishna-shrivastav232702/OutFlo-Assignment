import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { LinkedInProfile } from "../types/types.js";
import { generatePersonalizedMessage } from "../services/ai.js";


export const createPersonalizedMessage = asyncHandler(async (req: Request, res: Response) => {
    const { name, job_title, company, location, summary }: LinkedInProfile = req.body;
    if (!name || !job_title || !company) {
        res.status(400);
        throw new Error('Please provide name, job title, company');
    }
    try {
        const message = await generatePersonalizedMessage({
            name,
            job_title,
            company,
            location: location || '',
            summary: summary || ''
        });
        res.status(200).json({ message });
    } catch (error) {
        res.status(500);
        throw new Error('Internal Server Error');
    }
})