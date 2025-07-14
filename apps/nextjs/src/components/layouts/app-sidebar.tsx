"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Building2,
  Calendar,
  FileText,
  Heart,
  Home,
  Settings,
  Shield,
  Stethoscope,
  Users,
  Wrench,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@stackk/ui/sidebar";
import { Skeleton } from "@stackk/ui/skeleton";

import { authClient } from "~/auth/client";

const navigation = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "#",
        icon: Home,
      },
      {
        title: "Analytics",
        url: "#",
        icon: Activity,
      },
    ],
  },
  {
    title: "Clinical Management",
    items: [
      {
        title: "Patients",
        url: "#",
        icon: Users,
      },
      {
        title: "Diagnostic Reports",
        url: "#",
        icon: FileText,
      },
      {
        title: "Appointments",
        url: "#",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Equipment Management",
    items: [
      {
        title: "Inventory",
        url: "equipments",
        icon: Stethoscope,
      },
      {
        title: "Maintenance",
        url: "maintenance",
        icon: Wrench,
      },
      {
        title: "Types",
        url: "#",
        icon: Building2,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Audit Logs",
        url: "#",
        icon: Shield,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
    ],
  },
];

export function AppSidebar({ knownSlug }: { knownSlug: string }) {
  const { data, isPending } = authClient.useActiveOrganization();

  const baseItemUrl = `/spaces/${knownSlug}`;

  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 justify-center border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            {isPending ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <SidebarMenuButton className="gap-3 hover:bg-transparent active:bg-transparent">
                <Heart className="h-5 w-5 text-red-500" />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium capitalize">{data?.name}</span>
                  <span className="truncate text-xs">{data?.slug}</span>
                </div>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.startsWith(`${baseItemUrl}/${item.url}`)}
                      tooltip={item.title}
                    >
                      <Link href={`${baseItemUrl}/${item.url}`}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
