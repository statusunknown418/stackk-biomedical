"use client";

import { Fragment } from "react";
import { useParams, useRouter, useSelectedLayoutSegments } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@stackk/ui/breadcrumb";
import { Button } from "@stackk/ui/button";
import { Separator } from "@stackk/ui/separator";
import { SidebarTrigger } from "@stackk/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@stackk/ui/tooltip";

export const AppHeader = () => {
  const pageParams = useParams<{ spaceSlug: string }>();
  const layoutSegments = useSelectedLayoutSegments();

  const segmentsWithoutLast = layoutSegments.slice(0, -1);
  const router = useRouter();

  return (
    <header className="bg-sidebar sticky inset-0 z-10 flex h-14 shrink-0 items-center gap-1 border-b px-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger variant="ghost" className="-ml-1 !size-8" />
        </TooltipTrigger>

        <TooltipContent>Cerrar sidebar</TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className="mx-1 h-4" />

      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="iconSM" variant="ghost" onClick={() => router.back()}>
              <ArrowLeftIcon />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Retroceder</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="iconSM" variant="ghost" onClick={() => router.forward()}>
              <ArrowRightIcon />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Avanzar</TooltipContent>
        </Tooltip>
      </div>

      <Separator orientation="vertical" className="ml-1 h-4" />

      <Breadcrumb className="pl-3">
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href={`/spaces/${pageParams.spaceSlug}`}>
              StackkBiomedical
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="hidden md:block" />

          {segmentsWithoutLast.map((segment, index) => (
            <Fragment key={index}>
              <BreadcrumbItem className="capitalize">
                {index === layoutSegments.length - 1 ? (
                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                ) : (
                  <span>{segment}</span>
                )}
              </BreadcrumbItem>

              {index < layoutSegments.length - 1 && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};
