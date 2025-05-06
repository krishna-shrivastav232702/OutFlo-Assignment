import CampaignForm from "./CampaignForm";

export default function NewCampaignPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="flex items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Create Campaign</h2>
      </div>
      <div className="w-full">
        <CampaignForm />
      </div>
    </div>
  );
}
