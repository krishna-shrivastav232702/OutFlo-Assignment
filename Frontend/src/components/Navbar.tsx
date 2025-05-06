import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Github } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full py-4 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link
          to="/"
          className="mr-6 flex items-center space-x-2"
        >
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">OutFlo</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-lg font-medium">
          <Link to="/pricing" className="transition-colors hover:text-primary">
            Pricing
          </Link>
          <Link to="/dashboard/u" className="transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link to="/use-cases" className="transition-colors hover:text-primary">
            Use Cases
          </Link>
          <Link to="/contact" className="transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="https://github.com/krishna-shrivastav232702/OutFlo-Assignment" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
         
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Link to="/dashboard/linkedin-message">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
