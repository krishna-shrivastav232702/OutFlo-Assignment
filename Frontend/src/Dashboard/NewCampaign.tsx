import CampaignForm from "./CampaignForm";

export default function NewCampaignPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center">
        <h2 className="text-3xl font-bold tracking-tight">Create Campaign</h2>
      </div>
      <div className="grid gap-4">
        <CampaignForm />
      </div>
    </div>
  );
}