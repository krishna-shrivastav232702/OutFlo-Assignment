import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const plans = [
  {
    name: "Basic",
    price: "$9",
    features: ["5 team members", "10 projects", "Basic analytics", "Email support"],
  },
  {
    name: "Pro",
    price: "$29",
    features: ["Unlimited team members", "Unlimited projects", "Advanced analytics", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Custom features", "Dedicated account manager", "On-premise deployment", "24/7 phone support", "Unlimited projects", "Advanced analytics", "Priority support"],
  },
]

export default function Pricing() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <section id="pricing" className="py-24 mt-16">
          <div className="container mx-auto">
            <h2 className="text-4xl font-extrabold text-center mb-16">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {plans.map((plan, index) => (
                <Card key={index} className={index === 1 ? "border-primary" : ""}>
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-5xl font-extrabold">
                      {plan.price}
                      <span className="text-xl font-normal text-muted-foreground">/month</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="mb-8 space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-6 w-6 text-primary mr-3" />
                          <span className="text-lg font-semibold">{feature}</span>
                        </li>
                      ))}
                      {index < plans.length - 1 && plans[index + 1].features.map((feature, nextFeatureIndex) => {
                        if (!plan.features.includes(feature)) {
                          return (
                            <li key={`cross-${nextFeatureIndex}`} className="flex items-center text-muted-foreground">
                              <X className="h-6 w-6 text-destructive mr-3" />
                              <span className="text-lg line-through">{feature}</span>
                            </li>
                          )
                        }
                        return null;
                      })}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full py-4 text-lg" variant={index === 1 ? "default" : "outline"}>
                      {index === 2 ? "Contact Sales" : "Get Started"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  )
}
