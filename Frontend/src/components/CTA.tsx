import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-20 bg-background text-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Supercharge Your Sales Outreach</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join top sales teams using OutFlo to convert leads faster with AI-personalized messaging.
        </p>
        <Button size="lg" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Get Started Free
        </Button>
      </div>
    </section>
  )
}
