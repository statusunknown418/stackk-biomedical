"use client";

import { useRouter } from "next/navigation";
import {
  BatteryEmptyIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Alert, AlertDescription } from "@stackk/ui/alert";
import { Button } from "@stackk/ui/button";
import { DataTableViewOptions } from "@stackk/ui/data-table-view-options";
import { Separator } from "@stackk/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@stackk/ui/table";

import { useTRPC } from "~/lib/trpc/react";
import { allEquipmentsDataTableColumns } from "./columns";

export function AllEquipmentsDataTable() {
  const api = useTRPC();

  const columns = allEquipmentsDataTableColumns;
  const router = useRouter();

  const { data, error } = useSuspenseQuery(api.equipments.queries.listAll.queryOptions());

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <article className="grid gap-2">
      {error && (
        <Alert variant="destructive">
          <WarningIcon />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-end gap-2">
        <Button variant="outline" size="sm">
          <MagnifyingGlassIcon />
          Buscar equipos
        </Button>

        <Separator orientation="vertical" className="mx-2" />

        <Button variant="outline" size="sm">
          Filtrar
          <FunnelIcon />
        </Button>

        <DataTableViewOptions table={table} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() => {
                    return router.push(`${row.original.id}`);
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="flex h-24 flex-col items-center justify-center text-center"
                >
                  <BatteryEmptyIcon className="text-muted-foreground size-5" />
                  No se encontraron equipos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </article>
  );
}
