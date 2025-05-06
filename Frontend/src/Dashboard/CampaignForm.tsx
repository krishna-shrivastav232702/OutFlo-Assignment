import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface CampaignFormProps {
  campaignId?: string;
}

interface FormData {
  name: string;
  description: string;
  target: string;
  messageTemplate: string;
  followUpDays: number;
  maxFollowUps: number;
  status: 'draft' | 'active' | 'paused' | 'completed';
}

export default function CampaignForm({ campaignId }: CampaignFormProps) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    target: "",
    messageTemplate: "",
    followUpDays: 3,
    maxFollowUps: 2,
    status: "draft"
  })

  useEffect(() => {
    if (campaignId) {
      setIsLoading(true)
      // This would be an API call in a real application
      const fetchCampaign = async () => {
        try {
          // Simulate API call with delay
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // Mock data for the example
          const campaignData: FormData = {
            name: "B2B SaaS Outreach",
            description: "Targeting decision makers in mid-market SaaS companies",
            target: "CTOs, VPs of Engineering, and IT Directors",
            messageTemplate: "Hi {{firstName}},\n\nI noticed your company {{company}} has been making waves in the {{industry}} space. Our platform helps teams like yours optimize their workflow by {{valueProposition}}.\n\nWould you be open to a quick call to discuss how we might help your team?\n\nBest,\n{{userFirstName}}",
            followUpDays: 4,
            maxFollowUps: 3,
            status: "active"
          }
          
          setFormData(campaignData)
          setIsLoading(false)
        } catch (error) {
          console.error("Error fetching campaign:", error)
          setIsLoading(false)
        }
      }
      
      fetchCampaign()
    }
  }, [campaignId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value, 10)
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Simulate successful save
      console.log("Campaign saved:", formData)
      alert(campaignId ? "Campaign updated successfully!" : "Campaign created successfully!")
      
      // Navigate back to campaigns list
      navigate("/campaigns")
    } catch (error) {
      console.error("Error saving campaign:", error)
      alert("Error saving campaign. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && campaignId) {
    return <div className="text-center py-10">Loading campaign data...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Campaign Details</h3>
        
        <div className="grid gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Campaign Name*
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Q2 SaaS Outreach"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description of this campaign's goals and targets"
            />
          </div>
          
          <div>
            <label htmlFor="target" className="block text-sm font-medium mb-1">
              Target Audience*
            </label>
            <input
              id="target"
              name="target"
              value={formData.target}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. CTOs at mid-market SaaS companies"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Message & Follow-up Settings</h3>
        
        <div className="grid gap-4">
          <div>
            <label htmlFor="messageTemplate" className="block text-sm font-medium mb-1">
              Message Template*
            </label>
            <textarea
              id="messageTemplate"
              name="messageTemplate"
              value={formData.messageTemplate}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="Hi {{firstName}},&#10;&#10;I noticed your company {{company}} has been making waves...&#10;&#10;Best,&#10;{{userFirstName}}"
            />
            <p className="text-xs text-gray-500 mt-1">Use {{variables}} for personalization</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="followUpDays" className="block text-sm font-medium mb-1">
                Days Between Follow-ups
              </label>
              <input
                type="number"
                id="followUpDays"
                name="followUpDays"
                value={formData.followUpDays}
                onChange={handleNumberInputChange}
                min={1}
                max={14}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="maxFollowUps" className="block text-sm font-medium mb-1">
                Maximum Follow-ups
              </label>
              <input
                type="number"
                id="maxFollowUps"
                name="maxFollowUps"
                value={formData.maxFollowUps}
                onChange={handleNumberInputChange}
                min={0}
                max={5}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Campaign Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate("/campaigns")}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : campaignId ? 'Update Campaign' : 'Create Campaign'}
        </button>
      </div>
    </form>
  )
}