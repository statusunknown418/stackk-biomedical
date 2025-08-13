import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";

import type { RouterOutputs } from "@stackk/api";
import { Badge } from "@stackk/ui/badge";
import { Button } from "@stackk/ui/button";
import { DataTableColumnHeader } from "@stackk/ui/data-table-headers";

type EquipmentRow = RouterOutputs["equipments"]["queries"]["listAll"][number];

export const allEquipmentsDataTableColumns: ColumnDef<EquipmentRow>[] = [
  {
    accessorKey: "serialNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Número de serie" />
    ),
  },
  {
    accessorKey: "specificType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo de equipo" />
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Marca" />,
    cell: ({ getValue }) => {
      const value = getValue();

      return (
        <Link href={String(value)}>
          <Button variant="outline" size="xs" className="uppercase">
            {String(value)} <ArrowRightIcon className="size-3.5" />
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "model",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Modelo" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
    cell: ({ getValue }) => {
      const value = getValue();

      switch (value) {
        case "active":
        case "idle":
          return <Badge variant="success">{String(value)}</Badge>;
        case "inactive":
        case "danger":
          return <Badge variant="destructive">{String(value)}</Badge>;
        default:
          return <Badge className="capitalize">{String(value)}</Badge>;
      }
    },
  },
  {
    accessorKey: "upss.code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="UPSS" />,
  },
];
