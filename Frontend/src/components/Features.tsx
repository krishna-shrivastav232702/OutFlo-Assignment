import { CheckCircle, Zap, Users, MessageSquare } from "lucide-react"

const features = [
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "AI Campaign Creation",
    description: "Launch personalized outreach campaigns in seconds using AI.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "One-Click Message Generation",
    description: "Craft highly personalized LinkedIn messages with a single click.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Profile Analysis",
    description: "Extract key insights from LinkedIn profiles for better personalization.",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "Multi-Step Sequences",
    description: "Set up and automate message follow-ups for higher conversion.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why OutFlo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
