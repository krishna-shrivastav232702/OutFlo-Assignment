import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import DashboardHeader from "./DashboardHeader"

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <DashboardHeader />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout