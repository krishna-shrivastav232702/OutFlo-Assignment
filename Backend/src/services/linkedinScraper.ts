import { chromium } from "@playwright/test";
import dotenv from "dotenv";
import { sleep } from "../utils/utils.js";
import Lead from "../models/lead.js";


dotenv.config();


async function saveLeadToDatabase(leadData: any) {
    try {
        await Lead.findOneAndUpdate(
            { profileUrl: leadData.profileUrl },
            leadData,
            { upsert: true, new: true }
        );
        console.log(`Saved lead: ${leadData.fullName}`);
    } catch (error) {
        console.error('Error saving lead:', error);
    }
}


export async function scrapeLinkedinProfiles() {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 100
    });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        viewport: { width: 1280, height: 800 }
    })
    const page = await context.newPage();

    try {
        await page.goto("https://www.linkedin.com/login");
        await page.fill("#username", process.env.LINKEDIN_EMAIL || '');
        await page.fill("#password", process.env.LINKEDIN_PASSWORD || '');
        await page.click('button[type="submit"]');

        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(30000);
        console.log('Logged in to LinkedIn');

        await sleep(3000 + Math.random() * 2000);

        const searchUrl = 'https://www.linkedin.com/search/results/people/?geoUrn=%5B%22103644278%22%5D&industry=%5B%221594%22%2C%221862%22%2C%2280%22%5D&keywords=%22lead%20generation%20agency%22&origin=GLOBAL_SEARCH_HEADER&sid=z%40k&titleFreeText=Founder';
        await page.goto(searchUrl);
        await page.waitForSelector('.search-results-container');
        console.log('Search results loaded');

        let profilesScraped = 0;
        const maxProfiles = 30;
        let pageNumber = 1;

        while (profilesScraped < maxProfiles) {
            console.log(`Scraping page ${pageNumber}...`);
            const profileCards = await page.$$('.ezgvNAwLzunClquMtsEuBTmhoWIkRCVatCPiU');
            for (const profileCard of profileCards) {
                console.log("Inside");
                if (profilesScraped >= maxProfiles) break;
                try {
                    const profileUrl = await profileCard.$eval('.GqjnuldgdUvCJCSRxbdTfvlZjKVUskKYKWU', (el) => el.getAttribute('href'));
                    const completeProfileUrl = profileUrl?.startsWith('https://')
                        ? profileUrl
                        : `https://www.linkedin.com${profileUrl}`;
                    console.log("Inside try");
                    const fullName = await profileCard.$eval('span[aria-hidden="true"]', el => el.textContent?.trim() || '');
                    console.log(fullName);
                    const jobTitle = await profileCard.$eval('.ifEPMbUmGbHtpxwohpzVTSECGDpLKliMrEScqQ', el => el.textContent?.trim() || '');
                    console.log(jobTitle);
                    const secondaryInfo = await profileCard.$eval('.entity-result__summary--2-lines',
                        el => el.textContent?.trim() || '');
                    console.log("Inside secondaryInfo");
                    let companyName = secondaryInfo;
                    let location = '';
                    try {
                        location = await profileCard.$eval('.GhUMSQZHSipTWCqKTeXsZvitdVbNQbnsccA',
                            el => el.textContent?.trim() || '');
                    } catch (e) {
                        const parts = secondaryInfo.split(' · ');
                        if (parts.length > 1) {
                            companyName = parts[0].trim();
                            location = parts[1].trim();
                        }
                    }

                    const leadData = {
                        fullName,
                        jobTitle,
                        companyName,
                        location,
                        profileUrl: completeProfileUrl
                    };
                    console.log(`Scraped: ${fullName} - ${jobTitle}`);
                    await saveLeadToDatabase(leadData);
                    await sleep(1000 + Math.random() * 1500);
                    profilesScraped++;
                } catch (error) {
                    console.error('Error scraping individual profile:', error);
                    continue;
                }
            }
            if (profilesScraped < maxProfiles) {
                const nextButton = await page.$('button[aria-label="Next"]');
                if (nextButton && await nextButton.isEnabled()) {
                    await nextButton.click();
                    await page.waitForSelector('.search-results-container');
                    await sleep(2000 + Math.random() * 2000);
                    pageNumber++;
                } else {
                    console.log('No more pages available');
                    break;
                }
            }

        }
        console.log(`Successfully scraped ${profilesScraped} profiles`);
    } catch (error) {
        console.error('Error during scraping:', error);
    } finally {
        await browser.close();
    }
}
