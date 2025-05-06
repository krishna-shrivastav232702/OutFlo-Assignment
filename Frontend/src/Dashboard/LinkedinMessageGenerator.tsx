import { useState } from "react";
import axios from "axios";

interface ToneOptions {
  friendly: boolean;
  professional: boolean;
  concise: boolean;
  personalized: boolean;
}

interface LinkedInProfile {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

export default function LinkedInMessageGenerator() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<LinkedInProfile>({
    name: "",
    job_title: "",
    company: "",
    location: "",
    summary: ""
  });
  const [toneOptions, setToneOptions] = useState<ToneOptions>({
    friendly: true,
    professional: true,
    concise: false,
    personalized: true
  });
  const [generatedMessage, setGeneratedMessage] = useState<string>("");
  const [showCopySuccess, setShowCopySuccess] = useState<boolean>(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedMessage("");
    
    try {
      const selectedTones = Object.entries(toneOptions)
        .filter(([_, value]) => value)
        .map(([key]) => key);
      
      const response = await axios.post('https://outflo-assignment-production.up.railway.app/messages/personalized-message', {
        ...profileData,
        tones: selectedTones
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      setGeneratedMessage(response.data.message);
    } catch (error) {
      console.error("Error generating message:", error);
      alert("Error generating message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleToneChange = (tone: keyof ToneOptions) => {
    setToneOptions(prev => ({
      ...prev,
      [tone]: !prev[tone]
    }));
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">LinkedIn Message Generator</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Recipient's Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              placeholder="E.g. John Smith"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="job_title" className="block text-sm font-medium mb-1">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="job_title"
              name="job_title"
              value={profileData.job_title}
              onChange={handleInputChange}
              placeholder="E.g. Marketing Director"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={profileData.company}
              onChange={handleInputChange}
              placeholder="E.g. TechCorp"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Location (Optional)
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={profileData.location}
              onChange={handleInputChange}
              placeholder="E.g. San Francisco, CA"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="summary" className="block text-sm font-medium mb-1">
              Profile Summary (Optional)
            </label>
            <textarea
              id="summary"
              name="summary"
              value={profileData.summary}
              onChange={handleInputChange}
              placeholder="E.g. Key points from their profile or recent achievements"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Message Tone</label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-md cursor-pointer">
                <input
                  type="checkbox"
                  checked={toneOptions.friendly}
                  onChange={() => handleToneChange('friendly')}
                  className="rounded"
                />
                <span>Friendly</span>
              </label>
              
              <label className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-md cursor-pointer">
                <input
                  type="checkbox"
                  checked={toneOptions.professional}
                  onChange={() => handleToneChange('professional')}
                  className="rounded"
                />
                <span>Professional</span>
              </label>
              
              <label className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-md cursor-pointer">
                <input
                  type="checkbox"
                  checked={toneOptions.concise}
                  onChange={() => handleToneChange('concise')}
                  className="rounded"
                />
                <span>Concise</span>
              </label>
              
              <label className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-md cursor-pointer">
                <input
                  type="checkbox"
                  checked={toneOptions.personalized}
                  onChange={() => handleToneChange('personalized')}
                  className="rounded"
                />
                <span>Personalized</span>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Generate Message'}
          </button>
        </form>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Generated Message</h3>
          
          {generatedMessage && (
            <button
              onClick={handleCopyToClipboard}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center"
            >
              {showCopySuccess ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          )}
        </div>
        
        <div className="h-[calc(100%-2rem)] min-h-[300px] bg-gray-50 dark:bg-gray-900 rounded-md p-4 font-mono whitespace-pre-wrap">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse text-gray-400">Generating message...</div>
            </div>
          ) : generatedMessage ? (
            generatedMessage
          ) : (
            <div className="text-gray-400 italic">
              Fill in the form and click "Generate Message" to create a personalized LinkedIn outreach message.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}