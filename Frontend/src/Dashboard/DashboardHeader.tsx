import { useState } from "react"
import { Link } from "react-router-dom"
import { MoonStar, Sun, Bell, Search } from "lucide-react"

export default function DashboardHeader() {
  const [theme, setTheme] = useState("light") // or get from localStorage/context
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    // In a real app, you would update the theme in the DOM or context
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white dark:bg-gray-900 px-4 md:px-6">
      <Link to="/" className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-blue-600"></div>
        <h1 className="text-xl font-bold tracking-tighter">OutFlo</h1>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <form className="relative hidden md:flex">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input 
            type="search" 
            placeholder="Search..." 
            className="w-64 rounded-lg bg-gray-100 dark:bg-gray-800 pl-8 md:w-80 py-2" 
          />
        </form>
        
        {/* Notifications dropdown */}
        <div className="relative inline-block text-left">
          <button className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </button>
          {/* Dropdown would be implemented here */}
        </div>
        
        {/* Theme toggle */}
        <button 
          onClick={toggleTheme} 
          className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 relative"
        >
          <Sun className={`h-4 w-4 transition-all ${theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
          <MoonStar className={`absolute top-2 left-2 h-4 w-4 transition-all ${theme === 'light' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
          <span className="sr-only">Toggle theme</span>
        </button>
        
        {/* User avatar */}
        <button className="rounded-full p-0">
          <img src="/placeholder.svg?height=32&width=32" alt="Avatar" className="h-8 w-8 rounded-full" />
          <span className="sr-only">Toggle user menu</span>
        </button>
      </div>
    </header>
  )
}