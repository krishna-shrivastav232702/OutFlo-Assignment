import { useParams } from "react-router-dom";
import CampaignForm from "./CampaignForm";

interface EditCampaignPageProps {
  // No props required
}

export default function EditCampaignPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center">
        <h2 className="text-3xl font-bold tracking-tight">Edit Campaign</h2>
      </div>
      <div className="grid gap-4">
        <CampaignForm campaignId={id} />
      </div>
    </div>
  );
}