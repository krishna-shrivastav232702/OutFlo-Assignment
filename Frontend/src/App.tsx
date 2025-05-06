import MouseMoveEffect from "./components/ui/mouse-move-effect"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="bg-background text-foreground antialiased">
      <MouseMoveEffect/>
      <Toaster />
      <Outlet />
    </div>
  )
}

export default App
