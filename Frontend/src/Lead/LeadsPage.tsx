import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import axios from "axios"
import { Search, UserPlus } from "lucide-react"
import { useEffect, useState } from "react"

interface Lead {
  _id: string;
  fullName: string;
  jobTitle: string;
  companyName: string;
  location: string;
  profileUrl: string;
}

interface LeadApiResponse {
  success: boolean;
  count: number;
  data: Lead[];
}

export default function LeadsPage() {
  const [searchUrl, setSearchUrl] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Lead[]>([])
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://outflo-assignment-production.up.railway.app/l/leads?page=${currentPage}&limit=${itemsPerPage}`
      );

      if (response.status !== 200) {
        throw new Error('Failed to fetch leads');
      }

      const data = response.data;
      setSearchResults(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchLeads();
  }, [currentPage, itemsPerPage]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`https://outflo-assignment-production.up.railway.app/api/leads/search?url=${encodeURIComponent(searchUrl)}`)

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data: LeadApiResponse = await response.json()
      setSearchResults(data.data)
    } catch (error) {
      console.error('Error searching leads:', error)
      fetchLeads()
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfiles((prev) => {
      if (prev.includes(profileId)) {
        return prev.filter((id) => id !== profileId)
      } else {
        return [...prev, profileId]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedProfiles.length === searchResults.length) {
      setSelectedProfiles([])
    } else {
      setSelectedProfiles(searchResults.map((profile) => profile._id))
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">LinkedIn Lead Finder</h1>
          <p className="text-gray-500 mt-2">Search and import leads from LinkedIn profiles</p>
        </div>

        <div className="bg-transparent rounded-lg shadow-md p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <Label htmlFor="linkedin-url">LinkedIn Search URL</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  id="linkedin-url"
                  placeholder="Paste LinkedIn search URL here"
                  value={searchUrl}
                  onChange={(e) => setSearchUrl(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    "Searching..."
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" /> Search
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Example: https://www.linkedin.com/search/results/people/?keywords="lead generation
                agency"&titleFreeText=Founder
              </p>
            </div>
          </form>
        </div>

        <Tabs defaultValue="results" className="w-full">
          <TabsContent value="results" className="space-y-4">
            <div className="bg-transparent rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="select-all"
                    checked={selectedProfiles.length === searchResults.length && searchResults.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <Label htmlFor="select-all" className="font-medium">
                    {selectedProfiles.length} selected
                  </Label>
                </div>

                <Button
                  variant="default"
                  size="sm"
                  disabled={selectedProfiles.length === 0}
                  onClick={async () => {
                    try {
                      await fetch('/api/leads/add-to-campaign', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ leadIds: selectedProfiles }),
                      });
                      setSelectedProfiles([]);
                    } catch (error) {
                      console.error('Error adding to campaign:', error);
                    }
                  }}
                >
                  <UserPlus className="mr-2 h-4 w-4" /> Add to Campaign
                </Button>
              </div>

              <div className="divide-y">
                {searchResults.map((profile) => (
                  <div key={profile._id} className="p-4 flex items-start gap-4 hover:bg-transparent">
                    <Checkbox
                      id={`profile-${profile._id}`}
                      checked={selectedProfiles.includes(profile._id)}
                      onCheckedChange={() => handleProfileSelect(profile._id)}
                      className="mt-1"
                    />

                    <div className="flex-shrink-0">
                      <img
                        src={"/placeholder.svg"}
                        alt={profile.fullName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{profile.fullName}</h3>
                      </div>

                      <p className="text-gray-700">
                        {profile.jobTitle} at {profile.companyName}
                      </p>
                      <p className="text-gray-500 text-sm">{profile.location}</p>

                      <div className="mt-2 flex items-center gap-2">
                        <a
                          href={profile.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <Button variant="ghost" size="sm">
                        Generate Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                  className="w-10 h-10 p-0"
                >
                  {i + 1}
                </Button>
              )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}

              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>

              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </Tabs>
      </div>
    </div>
  )
}
