"use client";

import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { cn } from "@stackk/ui";
import { Button } from "@stackk/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@stackk/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@stackk/ui/table";
import { TabsContent } from "@stackk/ui/tabs";

import { useTRPC } from "~/lib/trpc/react";

export const GeneralTab = ({ deviceId }: { deviceId: string }) => {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.equipments.queries.getDetails.queryOptions(deviceId));

  if (!data) {
    return null; // Handle the case where data is not available
  }

  return (
    <TabsContent
      value="general"
      className="grid max-w-svw grid-cols-1 gap-4 overflow-x-scroll md:[&_tr]:h-14"
    >
      <Card>
        <CardHeader>
          <CardTitle>Información general</CardTitle>
          <CardDescription>
            Características generales del equipo, como el modelo, marca, tipo de equipo,
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 overflow-x-auto lg:grid-cols-2">
          <div className="overflow-x-scroll rounded-l-lg border-y border-l">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">Grupo</TableCell>
                  <TableCell>
                    <Button variant="link" size="sm" className="uppercase">
                      {data.equipmentType.name}
                      <ArrowSquareOutIcon />
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">Marca</TableCell>
                  <TableCell>
                    <Button variant="link" size="sm">
                      {data.brand} <ArrowSquareOutIcon />
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">Modelo</TableCell>
                  <TableCell>{data.model}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="rounded-r-lg border-y border-r">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">Número de serie</TableCell>
                  <TableCell>{data.serialNumber}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Fecha de adquisición
                  </TableCell>
                  <TableCell className="capitalize">
                    {data.acquisitionDate
                      ? format(data.acquisitionDate, "EEEE, dd LLLL yyyy", { locale: es })
                      : "N/A"}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">Procedencia</TableCell>
                  <TableCell>{data.origin}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Proveedor</CardTitle>
            <CardDescription>Información del proveedor</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Nombre comercial
                    </TableCell>
                    <TableCell>
                      <Button variant="link" size="sm" className="uppercase">
                        {data.provider.name} <ArrowSquareOutIcon />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="text-muted-foreground">Teléfono</TableCell>
                    <TableCell>{data.provider.phone}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Correo electrónico
                    </TableCell>
                    <TableCell>{data.provider.email}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fabricante</CardTitle>
            <CardDescription>Información del proveedor</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground">Nombre</TableCell>
                    <TableCell>
                      <Button variant="link" size="sm" className="uppercase">
                        {data.maker.name} <ArrowSquareOutIcon />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="text-muted-foreground">Teléfono</TableCell>
                    <TableCell
                      className={cn(!data.maker.phone && "text-muted-foreground")}
                    >
                      {data.maker.phone ?? "N/A"}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Correo electrónico
                    </TableCell>
                    <TableCell>{data.maker.email}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>
    </TabsContent>
  );
};
