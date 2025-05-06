import LinkedInMessageGenerator from "./LinkedinMessageGenerator";

export default function LinkedinMessage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center">
        <h2 className="text-3xl font-bold tracking-tight">LinkedIn Message Generator</h2>
      </div>
      <div className="grid gap-4">
        <LinkedInMessageGenerator />
      </div>
    </div>
  );
}