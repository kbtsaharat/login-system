"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

const SIDEBAR_KEYBOARD_SHORTCUT = "b"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    axios
      .get("http://localhost:3000/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => router.push("/login"))
  }, [router])

  return (
    <SidebarProvider>
      <KeyboardSidebarToggle />
      <AppSidebar />

      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-gradient-to-r shadow-md">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 bg-white/30" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">
                  {user?.name || user?.email || "Loading..."}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main content */}
        <main className="flex flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-zinc-900 dark:to-black transition-all">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 text-center flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold text-gray-800 dark">
              Welcome back, <span className="text-blue-600">{user?.name || "User"}</span>!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              This is your VizzelTrack dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-zinc-800 rounded-xl shadow-md h-40 flex items-center justify-center text-gray-600 dark:text-gray-300"
              >
                Widget {n}
              </div>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function KeyboardSidebarToggle() {
  const { open, setOpen } = useSidebar()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, setOpen])

  return null
}
