import App from "@/App";
import Pricing from "@/components/Pricing";
import Campaigns from "@/Dashboard/CampaignsList";
import DashboardLayout from "@/Dashboard/DashboardLayout";
import Dashboard from "@/Dashboard/DashboardStats";
import EditCampaignPage from "@/Dashboard/EditCampaignPage";
import LinkedinMessage from "@/Dashboard/LinkedinMessageGenerator";
import NewCampaign from "@/Dashboard/NewCampaign";
import Home from "@/Landing/Home";
import UseCases from "@/Landing/UseCases";
import Contact from "@/Landing/Contact";
import axios from "axios";
import { createBrowserRouter } from "react-router-dom";



const campaignLoader = async ({ params }) => {
    try {
      const response = await axios.get(`https://outflo-assignment-production.up.railway.app/campaigns/${params.id}`);
      return response.data;
    } catch (error) {
      console.error("Error loading campaign:", error);
      return null;
    }
  };
  

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
                path: "/pricing",
                element: <Pricing />,
            },
            {
                path: "/use-cases",
                element: <UseCases />,
            },
            {
                path: "/contact",
                element: <Contact />,
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
                        path: `/dashboard/campaigns/:id/edit`,
                        element: <EditCampaignPage  />,
                        loader: campaignLoader
                    },
                    {
                        path: '/dashboard/linkedin-message',
                        element: <LinkedinMessage />,
                    },
                    {
                        path: "/dashboard/campaigns/new",
                        element: <NewCampaign />,
                    }
                ]
            },
        ],
    },
]);

export default Router;