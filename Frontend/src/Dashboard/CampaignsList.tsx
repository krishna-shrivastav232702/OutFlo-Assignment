import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
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

interface Campaign {
  _id: string
  name: string
  description: string
  status: "Active" | "Inactive" 
  leads: string[]
  accountIds: string[]
}

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get<Campaign[]>('http://localhost:8002/campaigns')
      setCampaigns(response.data)
    } catch (error) {
      toast.error('Failed to fetch campaigns')
      console.error('Error fetching campaigns:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const handleStatusToggle = async (id: string) => {
    try {
      const campaign = campaigns.find((c) => c._id === id)
      if (!campaign) return

      const newStatus = campaign.status === "Active" ? "Inactive" : "Active"

      setCampaigns((prevCampaigns) =>
        prevCampaigns.map((campaign) =>
          campaign._id === id
            ? {
              ...campaign,
              status: newStatus,
            }
            : campaign,
        )
      )

      await axios.put(`http://localhost:8002/campaigns/${id}`, { status: newStatus })

      toast.success("Campaign Status Updated", {
        description: `${campaign.name} is now ${newStatus.toLowerCase()}`,
      })
    } catch (error) {
      toast.error("Failed to update campaign status")
      fetchCampaigns()
    }
  }

  const handleDeleteCampaign = async (id: string) => {
    try {
      const campaign = campaigns.find((c) => c._id === id)
      if (!campaign) return

      setCampaigns((prevCampaigns) => prevCampaigns.filter((campaign) => campaign._id !== id))

      await axios.delete(`http://localhost:8002/campaigns/${id}`)

      toast.success("Campaign Deleted", {
        description: `${campaign.name} has been deleted`,
      })
    } catch (error) {
      toast.error("Failed to delete campaign")
      fetchCampaigns()
    }
  }

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="p-8">
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
        {isLoading ? (
          <div className="flex justify-center p-8">
            <p>Loading campaigns...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: "20%" }}>Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead style={{ width: "20%" }}>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Leads</TableHead>
                <TableHead className="hidden sm:table-cell">Accounts</TableHead>
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
                  <TableRow key={campaign._id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{campaign.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div
                          className={`mr-2 h-2 w-2 rounded-full ${campaign.status === "Active"  ? "bg-green-500" : "bg-gray-500"
                            }`}
                        />
                        <span className="capitalize">{campaign.status.toLowerCase()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {campaign.leads.length}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {campaign.accountIds.length}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleStatusToggle(campaign._id)}>
                          {campaign.status === "Active" ? (
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
                              <Link to={`/dashboard/campaigns/${campaign._id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteCampaign(campaign._id)}
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
        )}
      </div>
    </Card>
  )
}