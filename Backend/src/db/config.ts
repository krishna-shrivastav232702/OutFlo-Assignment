import dotenv from "dotenv"
import mongoose from "mongoose";
import { scrapeLinkedinProfiles } from "../services/linkedinScraper.js";

dotenv.config();

const mongoUrl:string|undefined = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error(`provide mongo url `);
    process.exit(1);
}

export const connectDb = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(mongoUrl);
        console.log(`Connected successfully to database :${connection.connection.host}`)
        await scrapeLinkedinProfiles();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error connecting to database: ${error.message}`);
        } else {
            console.error(`Unknown error occurred:`, error);
        }
        process.exit(1);
    }
}