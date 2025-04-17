"use client"

import { useState } from "react"
import { FileText, Download, Filter, Search, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardShell } from "@/components/dashboard-shell"
import { UploadModal } from "@/components/upload-modal"
import { Badge } from "@/components/ui/badge"

// Sample data for health records
const records = [
  {
    id: 1,
    title: "Annual Physical Examination",
    date: "2025-03-15",
    type: "Examination",
    provider: "Dr. Smith",
    facility: "General Hospital",
  },
  {
    id: 2,
    title: "Blood Test Results",
    date: "2025-02-28",
    type: "Lab Report",
    provider: "LabCorp",
    facility: "Medical Lab",
  },
  {
    id: 3,
    title: "COVID-19 Vaccination",
    date: "2025-01-10",
    type: "Vaccination",
    provider: "Dr. Johnson",
    facility: "Community Clinic",
  },
  {
    id: 4,
    title: "Chest X-Ray",
    date: "2024-12-05",
    type: "Imaging",
    provider: "Dr. Williams",
    facility: "Radiology Center",
  },
  {
    id: 5,
    title: "Prescription - Lisinopril",
    date: "2024-11-20",
    type: "Prescription",
    provider: "Dr. Brown",
    facility: "Family Practice",
  },
]

export function HealthRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [recordType, setRecordType] = useState("all")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  // Filter records based on search term and type
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.facility.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = recordType === "all" || record.type.toLowerCase() === recordType.toLowerCase()

    return matchesSearch && matchesType
  })

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Health Records</h1>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Record
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search records..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={recordType} onValueChange={setRecordType}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Record Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="examination">Examination</SelectItem>
              <SelectItem value="lab report">Lab Report</SelectItem>
              <SelectItem value="vaccination">Vaccination</SelectItem>
              <SelectItem value="imaging">Imaging</SelectItem>
              <SelectItem value="prescription">Prescription</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{record.title}</CardTitle>
                    <CardDescription>
                      {new Date(record.date).toLocaleDateString()} • {record.provider} • {record.facility}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{record.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Document available</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No records found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filters, or upload a new record.
            </p>
            <Button variant="outline" className="mt-4" onClick={() => setIsUploadModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </div>
        )}
      </div>

      <UploadModal open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen} />
    </DashboardShell>
  )
}
