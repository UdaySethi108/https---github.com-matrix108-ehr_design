"use client"

import type React from "react"

import { useState } from "react"
import { Camera, type File, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [providerUrl, setProviderUrl] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    // In a real app, we would upload the file or process the provider URL here
    // For now, we'll just close the modal
    onOpenChange(false)
    setSelectedFile(null)
    setProviderUrl("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Health Record</DialogTitle>
          <DialogDescription>Upload your health records or connect to your healthcare provider.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="camera">Camera</TabsTrigger>
            <TabsTrigger value="provider">Provider</TabsTrigger>
          </TabsList>
          <TabsContent value="file" className="py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="file">Select File</Label>
                <div className="flex items-center gap-2">
                  <Input id="file" type="file" accept=".pdf,image/*" onChange={handleFileChange} className="flex-1" />
                </div>
                {selectedFile && <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="camera" className="py-4">
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="border rounded-md p-8 w-full flex flex-col items-center justify-center">
                <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-sm text-muted-foreground">
                  Camera access will be requested when you click the button below
                </p>
              </div>
              <Button className="w-full">
                <Camera className="mr-2 h-4 w-4" />
                Open Camera
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="provider" className="py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="provider">Provider URL or API Key</Label>
                <Input
                  id="provider"
                  placeholder="https://provider.api/fhir"
                  value={providerUrl}
                  onChange={(e) => setProviderUrl(e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Connect to your healthcare provider using FHIR API or other supported protocols.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
