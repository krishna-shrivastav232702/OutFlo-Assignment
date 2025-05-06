import { useState } from "react";

interface ToneOptions {
  friendly: boolean;
  professional: boolean;
  concise: boolean;
  personalized: boolean;
}

export default function LinkedInMessageGenerator() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileText, setProfileText] = useState<string>("");
  const [companyInfo, setCompanyInfo] = useState<string>("");
  const [toneOptions, setToneOptions] = useState<ToneOptions>({
    friendly: true,
    professional: true,
    concise: false,
    personalized: true
  });
  const [generatedMessage, setGeneratedMessage] = useState<string>("");
  const [showCopySuccess, setShowCopySuccess] = useState<boolean>(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedMessage("");
    
    try {
      // In a real application, this would be an API call to an AI service
      await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate API delay
      
      // Mock response with an AI-generated message
      const toneString = Object.entries(toneOptions)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(", ");
        
      const mockMessage = `Hi [First Name],

I came across your profile and was impressed by your experience as ${
  profileText.includes("at") 
    ? profileText.split("at")[0].trim() 
    : "a professional in your field"
}.

${companyInfo 
  ? `I noticed that ${companyInfo} is making waves in the industry, and I think our solution could be a great fit for your team's needs.` 
  : "I think there might be some interesting synergies between our companies."
}

Would you be open to a quick 15-minute call to explore how we might work together?

Looking forward to connecting,
[Your Name]

(Note: This message is ${toneString} as requested)`;

      setGeneratedMessage(mockMessage);
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
      {/* Input Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="profileText" className="block text-sm font-medium mb-1">
              LinkedIn Profile Information
            </label>
            <textarea
              id="profileText"
              value={profileText}
              onChange={(e) => setProfileText(e.target.value)}
              placeholder="E.g. Marketing Director at TechCorp with 10+ years experience in digital marketing"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="companyInfo" className="block text-sm font-medium mb-1">
              Company Information (Optional)
            </label>
            <textarea
              id="companyInfo"
              value={companyInfo}
              onChange={(e) => setCompanyInfo(e.target.value)}
              placeholder="E.g. TechCorp recently secured Series B funding for their AI platform"
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
      
      {/* Output Display */}
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