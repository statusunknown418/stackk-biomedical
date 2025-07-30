"use client";

import { LaptopIcon } from "@phosphor-icons/react";

import type { RouterOutputs } from "@stackk/api";
import { createColumnConfigHelper } from "@stackk/ui/table-filters";

export type AllEquipmentRow = RouterOutputs["equipments"]["queries"]["listAll"][number];

const dtf = createColumnConfigHelper<AllEquipmentRow>();

export const allEquipmentsColumnsConfig = [
  dtf
    .multiOption()
    .accessor((row) => row.brand)
    .id("brand")
    .displayName("Marca")
    .icon(LaptopIcon)
    .build(),
] as const;
