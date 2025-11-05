'use client'

import * as React from "react"
import {
  Database,
  Folder,
  List,
  Pizza
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const data = {
  navMain: [
    {
      name: "Produtos",
      link: "/painel/produtos",
      icon: Database,
    },
    {
      name: "Categorias",
      link: "/painel/categorias",
      icon: Folder,
    },
    {
      name: "Pedidos",
      link: "/painel/pedidos",
      icon: List,
    },
  ],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-1.5">
              <Link href="/painel" className="flex items-center gap-2">
                <Pizza className="size-5" />
                <span className="text-base font-semibold">Delivery</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link href={item.link} className="flex items-center gap-2">
                      <item.icon className="size-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
