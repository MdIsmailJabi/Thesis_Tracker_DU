"use client"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Home,
  BookOpenCheck,
  FileText,
  PanelLeft,
  Settings,
  GitGraph,
  Users
} from "lucide-react"
import Link from "next/link"
import { UserNav } from "./UserNav"
import type { UserRole } from "@/lib/types"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard", roles: ['student', 'guide', 'research_admin', 'hod', 'registrar', 'vc', 'brs', 'co_guide'] },
  { href: "/submit-thesis", icon: BookOpenCheck, label: "Submit Thesis", roles: ['student'] },
  { href: "/theses", icon: Users, label: "Thesis List", roles: ['guide', 'hod', 'registrar', 'vc', 'brs', 'research_admin'] },
  { href: "/progress-reports", icon: FileText, label: "Progress Reports", roles: ['student', 'guide'] },
  { href: "/settings", icon: Settings, label: "Settings", roles: ['research_admin'] },
  { href: "/logs", icon: GitGraph, label: "Logs", roles: ['research_admin'] },
];

export function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-all group-hover:scale-110"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    <span className="sr-only">ThesisFlow</span>
                  </Link>
                  {navItems.map(item => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="relative ml-auto flex-1 md:grow-0">
                {/* Could add a breadcrumb or search bar here */}
            </div>
            <UserNav />
        </header>
    )
}
