import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold">HealthVault</h1>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <div className="sticky top-16 overflow-auto p-4 h-[calc(100vh-4rem)]">
            {/* SideNav would be here, but we're not including it in the shell */}
          </div>
        </aside>
        <main className="flex-1 p-8">
          <div className={cn("grid gap-8", className)} {...props}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
