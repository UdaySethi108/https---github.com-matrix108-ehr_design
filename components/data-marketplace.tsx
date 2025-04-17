"use client"

import { useState } from "react"
import { DollarSign, Info, Check, X, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { DashboardShell } from "@/components/dashboard-shell"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample data for marketplace listings
const listings = [
  {
    id: 1,
    title: "Diabetes Research Study",
    organization: "National Health Institute",
    compensation: "$75",
    dataType: "Medical History, Lab Results",
    purpose: "Research on Type 2 Diabetes prevention",
    duration: "6 months",
  },
  {
    id: 2,
    title: "Heart Health Analytics",
    organization: "CardioTech Research",
    compensation: "$120",
    dataType: "Heart Rate, Blood Pressure, Activity",
    purpose: "Developing predictive models for heart disease",
    duration: "12 months",
  },
  {
    id: 3,
    title: "Sleep Pattern Study",
    organization: "SleepWell Labs",
    compensation: "$50",
    dataType: "Sleep Data, Activity Levels",
    purpose: "Improving sleep disorder treatments",
    duration: "3 months",
  },
  {
    id: 4,
    title: "Medication Effectiveness",
    organization: "PharmResearch Inc.",
    compensation: "$200",
    dataType: "Prescription History, Symptoms",
    purpose: "Analyzing medication effectiveness across demographics",
    duration: "9 months",
  },
  {
    id: 5,
    title: "Genetic Predisposition Study",
    organization: "GenomeX",
    compensation: "$300",
    dataType: "Genetic Data, Family History",
    purpose: "Studying genetic factors in disease development",
    duration: "24 months",
  },
]

export function DataMarketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dataType, setDataType] = useState("all")
  const [selectedListing, setSelectedListing] = useState<(typeof listings)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter listings based on search term and data type
  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.organization.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = dataType === "all" || listing.dataType.toLowerCase().includes(dataType.toLowerCase())

    return matchesSearch && matchesType
  })

  const handleViewDetails = (listing: (typeof listings)[0]) => {
    setSelectedListing(listing)
    setIsDialogOpen(true)
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Data Marketplace</h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search studies and organizations..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Data Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="medical history">Medical History</SelectItem>
              <SelectItem value="lab results">Lab Results</SelectItem>
              <SelectItem value="heart rate">Heart Rate</SelectItem>
              <SelectItem value="sleep data">Sleep Data</SelectItem>
              <SelectItem value="genetic data">Genetic Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <Card key={listing.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{listing.title}</CardTitle>
                  <Badge variant="outline" className="bg-primary/10">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {listing.compensation}
                  </Badge>
                </div>
                <CardDescription>{listing.organization}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Data Required:</span> {listing.dataType}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {listing.duration}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(listing)}>
                  <Info className="mr-2 h-4 w-4" />
                  Details
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Participate</span>
                  <Switch />
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No studies found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filters to find relevant studies.
            </p>
          </div>
        )}
      </div>

      {selectedListing && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedListing.title}</DialogTitle>
              <DialogDescription>{selectedListing.organization}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Purpose</h4>
                  <p className="text-sm text-muted-foreground">{selectedListing.purpose}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Data Required</h4>
                  <p className="text-sm text-muted-foreground">{selectedListing.dataType}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Compensation</h4>
                  <p className="text-sm text-muted-foreground">{selectedListing.compensation}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Duration</h4>
                  <p className="text-sm text-muted-foreground">{selectedListing.duration}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Consent Terms</h4>
                  <p className="text-sm text-muted-foreground">
                    By participating, you agree to share the specified data types for the duration of the study. Your
                    data will be anonymized and used only for the stated purpose. You can withdraw consent at any time.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="mr-2 h-4 w-4" />
                Decline
              </Button>
              <Button type="button" onClick={() => setIsDialogOpen(false)}>
                <Check className="mr-2 h-4 w-4" />
                Accept & Participate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardShell>
  )
}
