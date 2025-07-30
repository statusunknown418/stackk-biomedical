"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BuildingIcon, UsbIcon } from "@phosphor-icons/react";
import { Activity, Building2, Heart, Home, Settings, Shield, Wrench } from "lucide-react";

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
import { Tooltip, TooltipContent, TooltipTrigger } from "@stackk/ui/tooltip";

import { authClient } from "~/auth/client";

const navigation = [
  {
    title: "Overview",
    path: "",
    items: [
      {
        title: "Dashboard",
        url: "",
        icon: Home,
      },
      {
        title: "Analíticas",
        url: "/analytics",
        icon: Activity,
      },
    ],
  },
  {
    title: "Teams",
    path: "/teams",
    items: [
      {
        title: "UPSS",
        url: "",
        icon: BuildingIcon,
      },
    ],
  },

  {
    title: "Gestión de Dispositivos",
    path: "/devices",
    items: [
      {
        title: "Inventario",
        url: "/all",
        icon: UsbIcon,
      },
      {
        title: "Mantenimiento",
        url: "/maintenance",
        icon: Wrench,
      },
      {
        title: "Tipos de Equipos",
        url: "/types",
        icon: Building2,
      },
    ],
  },
  /**
   * TODO: Add this back once Inventory is done
   */
  // {
  //   title: "Gestión de Pacientes",
  //   path: "hl7",
  //   items: [
  //     {
  //       title: "Pacientes",
  //       url: "#",
  //       icon: Users,
  //     },
  //     {
  //       title: "Informes Diagnósticos",
  //       url: "#",
  //       icon: FileText,
  //     },
  //     {
  //       title: "Citas y Consultas",
  //       url: "#",
  //       icon: Calendar,
  //     },
  //   ],
  // },
  {
    title: "System",
    path: "/system",
    items: [
      {
        title: "Audit Logs",
        url: "/audit",
        icon: Shield,
      },
      {
        title: "Settings",
        url: "/settings",
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton className="gap-3 hover:bg-transparent active:bg-transparent">
                    <Heart className="h-5 w-5 !text-red-500" />

                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium capitalize">
                        {data?.name}
                      </span>
                      <span className="text-muted-foreground truncate font-mono text-xs">
                        {data?.slug}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </TooltipTrigger>

                <TooltipContent>{data?.name ?? "No active organization"}</TooltipContent>
              </Tooltip>
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
                {section.items.map((item) => {
                  const isDashboard =
                    item.title.toLowerCase() === "dashboard" && pathname === baseItemUrl;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={
                          isDashboard ||
                          pathname === `${baseItemUrl}${section.path}${item.url}`
                        }
                        tooltip={item.title}
                      >
                        <Link href={`${baseItemUrl}${section.path}${item.url}`}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
