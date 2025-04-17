"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart, FileText, DollarSign, Lightbulb, Users, ChevronRight } from "lucide-react"

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SideNav({ className, ...props }: SideNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Health Metrics",
      href: "/dashboard/metrics",
      icon: BarChart,
    },
    {
      name: "Health Records",
      href: "/dashboard/records",
      icon: FileText,
    },
    {
      name: "Data Marketplace",
      href: "/dashboard/marketplace",
      icon: DollarSign,
    },
    {
      name: "Insights",
      href: "/dashboard/insights",
      icon: Lightbulb,
    },
    {
      name: "Community",
      href: "/dashboard/community",
      icon: Users,
    },
  ]

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.name}</span>
          <ChevronRight className="ml-auto h-4 w-4" />
        </Link>
      ))}
    </nav>
  )
}
