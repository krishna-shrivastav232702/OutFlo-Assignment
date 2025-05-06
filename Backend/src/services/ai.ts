import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { LinkedInProfile } from '../types/types.js';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export async function generatePersonalizedMessage(profile: LinkedInProfile): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured in environment variables');
  }
  
  try {
    return await generateWithGeminiSDK(profile);
  } catch (error) {
    console.error('Error generating message:', error);
    throw new Error('Failed to generate personalized message with Gemini API');
  }
}

async function generateWithGeminiSDK(profile: LinkedInProfile): Promise<string> {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
      You are a professional sales outreach assistant. Your task is to create personalized 
      LinkedIn outreach messages for sales approaches. The messages should:
      - Be professional and friendly
      - Reference the recipient's job title and company
      - Mention how OutFlo can help automate their outreach to increase meetings & sales
      - Be concise (2-3 sentences)
      - Include a clear call to action
      
      Respond with just the message text without quotation marks.
    `
  });

  const prompt = createPrompt(profile);
  
  try {
    const result = await model.generateContent(prompt);
    
    if (result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return result.response.candidates[0].content.parts[0].text.trim();
    } else {
      throw new Error('Unexpected response structure from Gemini API');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate message with Gemini API');
  }
}

function createPrompt(profile: LinkedInProfile): string {
  return `
    Create a personalized LinkedIn outreach message for a sales approach.
    
    Profile details:
    - Name: ${profile.name}
    - Job Title: ${profile.job_title}
    - Company: ${profile.company}
    - Location: ${profile.location || 'Unknown'}
    - Summary: ${profile.summary || 'No summary provided'}
  `;
}