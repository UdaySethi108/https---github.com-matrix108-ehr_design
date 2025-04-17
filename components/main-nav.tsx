import Link from "next/link"
import { Lock } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Lock className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg">HealthVault</span>
      </Link>
    </div>
  )
}
