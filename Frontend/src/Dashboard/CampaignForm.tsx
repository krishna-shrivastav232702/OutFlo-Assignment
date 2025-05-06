import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, X } from "lucide-react";

interface FormData {
  name: string;
  description: string;
  status: string;
  leads: string[];
  accountIDs: string[];
}

interface CampaignFormProps {
  isEditMode?: boolean;
  initialData?: any;
  campaignId?: string;
}

export default function CampaignForm({ isEditMode = false, initialData, campaignId }: CampaignFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [leadInput, setLeadInput] = useState<string>("");
  const [accountInput, setAccountInput] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    status: "active",
    leads: [],
    accountIDs: []
  });
  const [error, setError] = useState<string | null>(null);

  // Initialize form with data if in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        status: initialData.status?.toLowerCase() || "active",
        leads: initialData.leads || [],
        accountIDs: initialData.accountIds || []
      });
    }
  }, [isEditMode, initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddLead = () => {
    if (leadInput.trim()) {
      setFormData(prev => ({
        ...prev,
        leads: [...prev.leads, leadInput.trim()]
      }));
      setLeadInput("");
    }
  };

  const handleRemoveLead = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      leads: prev.leads.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleAddAccount = () => {
    if (accountInput.trim()) {
      setFormData(prev => ({
        ...prev,
        accountIDs: [...prev.accountIDs, accountInput.trim()]
      }));
      setAccountInput("");
    }
  };

  const handleRemoveAccount = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      accountIDs: prev.accountIDs.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      setError("Name and description are required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let response;
      
      if (isEditMode) {
        // Update existing campaign
        response = await axios.put(`https://outflo-assignment-production.up.railway.app/campaigns/${campaignId}`, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        // Create new campaign
        response = await axios.post('https://outflo-assignment-production.up.railway.app/campaigns', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      if (response.status === 200 || response.status === 201) {
        navigate("/dashboard/campaigns");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} campaign`);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto border rounded-lg shadow p-8">
      <h1 className="text-2xl font-bold mb-2">{isEditMode ? "Edit Campaign" : "Create New Campaign"}</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="bg-transparent p-6 rounded-lg shadow">
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
                className="w-full p-2 border rounded-md"
                placeholder="Enter campaign name"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border rounded-md"
                placeholder="Describe your campaign"
              />
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
                className="w-full p-2 border rounded-md bg-transparent"
              >
                <option value="active" className="bg-slate-700 rounded-md">Active</option>
                <option value="inactive" className="bg-slate-700 rounded-md">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-transparent p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Campaign Leads</h3>
          
          <div className="flex mb-2">
            <input
              value={leadInput}
              onChange={(e) => setLeadInput(e.target.value)}
              className="w-full p-2 border rounded-l-md"
              placeholder="Enter Linkedin url"
            />
            <button
              type="button" 
              onClick={handleAddLead}
              className="bg-blue-600 text-white px-3 rounded-r-md hover:bg-blue-700"
            >
              <Plus size={20} />
            </button>
          </div>
          
          <div className="mt-2">
            {formData.leads.length === 0 ? (
              <p className="text-sm text-gray-500">No leads added yet</p>
            ) : (
              <div className="flex flex-wrap gap-2 bg-transparent">
                {formData.leads.map((lead, index) => (
                  <div key={index} className="flex items-center bg-transparent border px-3 py-2 rounded-full">
                    <span className="text-sm">{lead}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveLead(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-transparent p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Associated Accounts</h3>
          
          <div className="flex mb-2">
            <input
              value={accountInput}
              onChange={(e) => setAccountInput(e.target.value)}
              className="w-full p-2 border rounded-l-md"
              placeholder="Enter account ID"
            />
            <button
              type="button" 
              onClick={handleAddAccount}
              className="bg-blue-600 text-white px-3 rounded-r-md hover:bg-blue-700"
            >
              <Plus size={20} />
            </button>
          </div>
          
          <div className="mt-2">
            {formData.accountIDs.length === 0 ? (
              <p className="text-sm text-gray-500">No accounts added yet</p>
            ) : (
              <div className="flex flex-wrap gap-2 bg-transparent">
                {formData.accountIDs.map((account, index) => (
                  <div key={index} className="flex items-center bg-transparent border px-3 py-2 rounded-full">
                    <span className="text-sm">{account}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveAccount(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/campaigns")}
            className="px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit" 
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Campaign' : 'Create Campaign')}
          </button>
        </div>
      </form>
    </div>
  );
}