"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {
  ChevronUp,
  User2,
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// 🔴 เมนูหลัก (ใส่ไอคอนและ route)
const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // ✅ โหลดข้อมูลผู้ใช้
  useEffect(() => {
    const localUser = localStorage.getItem("user")
    if (localUser) {
      setUser(JSON.parse(localUser))
      setLoading(false)
    } else {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return
      }

      axios
        .get("http://localhost:3000/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data)
          localStorage.setItem("user", JSON.stringify(res.data))
        })
        .catch(() => {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          router.push("/login")
        })
        .finally(() => setLoading(false))
    }
  }, [router])

  // ✅ ออกจากระบบ
  const handleSignOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <Sidebar collapsible="icon" className="bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800">
      <SidebarContent>
        {/* 🔴 Group: Title */}
        <SidebarGroup>
          <SidebarGroupLabel
          className="
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-blue-600 
            to-blue-400 
            font-extrabold 
            text-lg 
            tracking-wide 
            drop-shadow-sm
          "
        >
          Vizzel<span className="text-gray-800 dark:text-gray-100">Track</span>
        </SidebarGroupLabel>


          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => router.push(item.url)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 
                      hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 transition-colors duration-150"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ✅ Footer */}
      <SidebarFooter className="border-t border-gray-200 dark:border-zinc-800 mt-auto p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
                  <User2 className="w-4 h-4" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">
                      {loading ? "Loading..." : user?.name || "Guest"}
                    </p>
                    {/* <p className="text-xs text-gray-500 truncate">
                      {user?.email || ""}
                    </p> */}
                  </div>
                  <ChevronUp className="w-4 h-4 ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                className="min-w-48 bg-white dark:bg-zinc-900 shadow-lg border border-gray-200 dark:border-zinc-700 rounded-lg"
              >
                <DropdownMenuItem
                  onClick={() => router.push("#")}
                  className="hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 cursor-pointer"
                >
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("#")}
                  className="hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 cursor-pointer"
                >
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-red-600 font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
