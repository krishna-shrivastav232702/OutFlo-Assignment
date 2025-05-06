import { useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import axios from "axios";
import CampaignForm from "./CampaignForm";

export default function EditCampaignPage() {
  const { id } = useParams();
  const initialData = useLoaderData();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we have loader data, use it
    if (initialData) {
      setCampaign(initialData);
      setIsLoading(false);
      return;
    }

    // Otherwise fetch the data manually
    const fetchCampaign = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://outflo-assignment-production.up.railway.app/campaigns/${id}`);
        setCampaign(response.data);
      } catch (err) {
        setError("Failed to fetch campaign details");
        console.error("Error fetching campaign:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
  }, [id, initialData]);

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <p>Loading campaign data...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || "Campaign not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center">
        <h2 className="text-3xl font-bold tracking-tight">Edit Campaign</h2>
      </div>
      <div className="grid gap-4">
        <CampaignForm isEditMode={true} initialData={campaign} campaignId={id} />
      </div>
    </div>
  );
}