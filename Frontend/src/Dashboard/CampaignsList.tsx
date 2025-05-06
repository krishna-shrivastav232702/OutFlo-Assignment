"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { MoreHorizontal, Plus, Search, Edit, Trash2, PauseCircle, PlayCircle } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for campaigns
const initialCampaigns = [
  {
    id: "1",
    name: "B2B SaaS Outreach",
    description: "Campaign targeting SaaS companies for our enterprise solution",
    status: "active",
    leads: 42,
    accounts: 2,
  },
  {
    id: "2",
    name: "Tech Startups Campaign",
    description: "Targeting early-stage tech startups in the US",
    status: "active",
    leads: 78,
    accounts: 3,
  },
  {
    id: "3",
    name: "Enterprise Decision Makers",
    description: "Targeting C-level executives in Fortune 500 companies",
    status: "inactive",
    leads: 103,
    accounts: 5,
  },
  {
    id: "4",
    name: "Marketing Agencies",
    description: "Outreach to marketing agencies to promote our platform",
    status: "active",
    leads: 56,
    accounts: 2,
  },
  {
    id: "5",
    name: "E-commerce Businesses",
    description: "Campaign for e-commerce businesses to increase sales",
    status: "inactive",
    leads: 89,
    accounts: 4,
  },
]

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [searchQuery, setSearchQuery] = useState("")

  const handleStatusToggle = (id: string) => {
    setCampaigns((prevCampaigns) =>
      prevCampaigns.map((campaign) =>
        campaign.id === id
          ? {
              ...campaign,
              status: campaign.status === "active" ? "inactive" : "active",
            }
          : campaign,
      ),
    )

    const campaign = campaigns.find((c) => c.id === id)
    const newStatus = campaign?.status === "active" ? "inactive" : "active"

    toast.success("Campaign Status Updated", {
      description: `${campaign?.name} is now ${newStatus}`,
    })
  }

  const handleDeleteCampaign = (id: string) => {
    const campaign = campaigns.find((c) => c.id === id)

    setCampaigns((prevCampaigns) => prevCampaigns.filter((campaign) => campaign.id !== id))

    toast.error("Campaign Deleted", {
      description: `${campaign?.name} has been deleted`,
    })
  }

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">Campaigns</h2>
          <span className="rounded-full bg-secondary px-2 py-1 text-xs">{campaigns.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search campaigns..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button asChild>
            <Link to="/dashboard/campaigns/new">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Link>
          </Button>
        </div>
      </div>
      <div className="border-t">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Leads</TableHead>
              <TableHead className="hidden sm:table-cell">Accounts</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No campaigns found. Create your first campaign!
                </TableCell>
              </TableRow>
            ) : (
              filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{campaign.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div
                        className={`mr-2 h-2 w-2 rounded-full ${
                          campaign.status === "active" ? "bg-green-500" : "bg-gray-500"
                        }`}
                      />
                      <span className="capitalize">{campaign.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{campaign.leads}</TableCell>
                  <TableCell className="hidden sm:table-cell">{campaign.accounts}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleStatusToggle(campaign.id)}>
                        {campaign.status === "active" ? (
                          <PauseCircle className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <PlayCircle className="h-4 w-4 text-green-500" />
                        )}
                        <span className="sr-only">Toggle Status</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to={`/campaigns/${campaign.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
