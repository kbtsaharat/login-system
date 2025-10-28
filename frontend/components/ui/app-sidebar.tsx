"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { ChevronUp, User2, Calendar, Home, Inbox, Search, Settings } from "lucide-react"

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

// เมนูหลัก
const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // โหลดข้อมูล user
  useEffect(() => {
    const localUser = localStorage.getItem("user")
    if (localUser) {
      setUser(JSON.parse(localUser))
      setLoading(false)
    } else {
      // ถ้าไม่มีใน localStorage → ลองดึงจาก API
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

  // ฟังก์ชันออกจากระบบ
  const handleSignOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => router.push(item.url)}
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

      {/* ✅ Footer: แสดงอีเมลของผู้ใช้ */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <User2 className="mr-2" />
                  {loading ? "Loading..." : user?.email || "Unknown"}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                className="min-w-0 [width:var(--radix-popper-anchor-width)]"
              >
                <DropdownMenuItem onClick={() => router.push("#")}>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("#")}>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <span className="text-red-500 font-medium">Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
