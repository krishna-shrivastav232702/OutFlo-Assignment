import { Document } from "mongoose";

export enum CampaignStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
    DELETED = 'Deleted'
}

export interface ICampaign extends Document {
    name: string;
    description: string;
    status: CampaignStatus;
    leads: string[];
    accountIDs: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface LinkedInProfile {
    name: string;
    job_title: string;
    company: string;
    location: string;
    summary: string;
}

export interface MessageResponse {
    message: string;
}
