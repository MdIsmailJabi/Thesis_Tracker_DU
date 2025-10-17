"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Home,
  BookOpenCheck,
  FileText,
  Settings,
  GitGraph,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/types"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard", roles: ['scholar', 'guide', 'registrar', 'vc', 'brs'] },
  { href: "/submit-thesis", icon: BookOpenCheck, label: "Submit Thesis", roles: ['scholar'] },
  { href: "/theses", icon: Users, label: "Thesis List", roles: ['guide', 'registrar', 'vc', 'brs'] },
  { href: "/progress-reports", icon: FileText, label: "Progress Reports", roles: ['scholar', 'guide'] },
];

const adminNavItems = [
    { href: "/settings", icon: Settings, label: "Settings", roles: [] },
    { href: "/logs", icon: GitGraph, label: "Logs", roles: [] },
]

export function SidebarNav({ userRole }: { userRole: UserRole }) {
  const pathname = usePathname()

  const accessibleNavItems = navItems.filter(item => item.roles.includes(userRole));
  const accessibleAdminNavItems = adminNavItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-all group-hover:scale-110"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <span className="sr-only">ThesisFlow</span>
          </Link>
          {accessibleNavItems.map(item => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                    pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        {accessibleAdminNavItems.length > 0 && (
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                {accessibleAdminNavItems.map(item => (
                    <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                        <Link
                        href={item.href}
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                            pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                        >
                        <item.icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                ))}
            </nav>
        )}
      </TooltipProvider>
    </aside>
  )
}
