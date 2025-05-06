import { useState } from "react"
import { Link } from "react-router-dom"
import { MoonStar, Sun, Bell, Search } from "lucide-react"

export default function DashboardHeader() {
  const [theme, setTheme] = useState("light") 
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white dark:bg-gray-900 px-4 md:px-6">
      <Link to="/" className="flex items-center gap-2">
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
        
        <div className="relative inline-block text-left">
          <button className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </button>
        </div>
        
        <button 
          onClick={toggleTheme} 
          className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 relative"
        >
          <Sun className={`h-4 w-4 transition-all ${theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
          <MoonStar className={`absolute top-2 left-2 h-4 w-4 transition-all ${theme === 'light' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
          <span className="sr-only">Toggle theme</span>
        </button>
        
        <button className="rounded-full p-0">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="h-8 w-8 rounded-full" />
          <span className="sr-only">Toggle user menu</span>
        </button>
      </div>
    </header>
  )
}