import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/Landing/Home";
import DashboardLayout from "@/Dashboard/DashboardLayout";
import Dashboard from "@/Dashboard/DashboardStats";
import Campaigns from "@/Dashboard/CampaignsList";
import LinkedinMessage from "@/Dashboard/LinkedinMessageGenerator";
import Campaign from "@/Dashboard/CampaignForm";
import NewCampaign from "@/Dashboard/NewCampaign";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/dashboard",
                element: <DashboardLayout />,
                children: [
                    {
                        path: "/dashboard/u",
                        element: <Dashboard />,
                    },
                    {
                        path: "/dashboard/campaigns",
                        element: <Campaigns />,
                    },
                    {
                        path: `dashboard/campaigns/:id/edit`,
                        element: <Campaign  />,
                    },
                    {
                        path: '/dashboard/linkedin-message',
                        element: <LinkedinMessage />,
                    },
                    {
                        path: "/dashboard/campaings/new",
                        element: <NewCampaign />,
                    }
                ]
            },
        ],
    },
]);

export default Router;