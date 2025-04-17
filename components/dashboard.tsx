"use client"

import { useState } from "react"
import { Upload, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNav } from "@/components/side-nav"
import { UploadModal } from "@/components/upload-modal"

export function Dashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SideNav className="mt-8" />
              </SheetContent>
            </Sheet>
            <MainNav />
          </div>
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <div className="sticky top-16 overflow-auto p-4 h-[calc(100vh-4rem)]">
            <SideNav />
          </div>
        </aside>
        <main className="flex-1 p-8">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Welcome to HealthVault</h1>
              <p className="text-muted-foreground mt-2">Upload your health records to get started</p>
            </div>
            <Button
              size="lg"
              className="rounded-full h-32 w-32 flex flex-col gap-2"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Upload className="h-8 w-8" />
              <span>Upload</span>
            </Button>
          </div>
        </main>
      </div>
      <UploadModal open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen} />
    </div>
  )
}
