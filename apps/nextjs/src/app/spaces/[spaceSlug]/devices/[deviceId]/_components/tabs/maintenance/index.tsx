"use client";

import { ArrowRightIcon, BatteryChargingIcon, ElevatorIcon } from "@phosphor-icons/react";
import { FileTextIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@stackk/ui/button";
import { Checkbox } from "@stackk/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@stackk/ui/dialog";
import { FormItem } from "@stackk/ui/form";
import { Input } from "@stackk/ui/input";
import { Label } from "@stackk/ui/label";
import { Separator } from "@stackk/ui/separator";
import { TabsContent } from "@stackk/ui/tabs";

import { CostsOverview } from "./CostsOverview";
import { MaintenanceOverview } from "./MaintenanceOverview";

export const MaintenanceTab = () => {
  return (
    <TabsContent
      value="maintenance"
      className="grid max-w-svw grid-cols-1 gap-4 overflow-x-scroll md:grid-cols-2 md:[&_tr]:h-14"
    >
      <MaintenanceOverview />

      <CostsOverview />

      <Separator />

      <section className="col-span-full grid gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="h-12 justify-start p-4">
              <FileTextIcon weight="fill" />
              Ver protocolo de mantenimiento
              <ArrowRightIcon />
            </Button>
          </DialogTrigger>

          <DialogContent className="gap-5">
            <DialogHeader>
              <DialogTitle>Protocolo para ventiladores</DialogTitle>
            </DialogHeader>

            <p className="text-muted-foreground text-sm">Equipos necesarios</p>

            <div className="grid grid-cols-2 gap-2">
              <article className="bg-card text-muted-foreground flex items-center gap-4 rounded-lg border p-4 text-sm">
                <BatteryChargingIcon className="size-6" />
                <p>Analizador de seguridad eléctrica</p>
              </article>

              <article className="bg-card text-muted-foreground flex items-center gap-4 rounded-lg border p-4 text-sm">
                <ElevatorIcon className="size-6" />
                <p>Pulmón de prueba</p>
              </article>
            </div>

            <Separator />

            <FormItem>
              <Label>Procedimiento</Label>

              <Input placeholder="Calibración de equipo" />
            </FormItem>

            <FormItem>
              <Label>Tiempo estimado</Label>

              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Input placeholder="2" className="w-20" /> horas
              </div>
            </FormItem>

            <Separator />

            <FormItem>
              <Label>Técnico</Label>
              <Input placeholder="Nombre" />
            </FormItem>

            <FormItem>
              <Label>Fecha</Label>
              <Input placeholder="DD/MM/YYYY" type="date" />
            </FormItem>

            <Separator />

            <div>
              <p>Pruebas de inspección y funcionalidad</p>
              <p className="text-muted-foreground text-sm">
                Seleccionar todos los que aplican
              </p>
            </div>

            <section className="grid grid-cols-2 gap-4">
              <Label className="flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                  id="toggle-2"
                  defaultChecked
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm font-medium">
                    El dispositivo esta limpio y descontaminado
                  </p>
                </div>
              </Label>

              <Label className="flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                  id="toggle-3"
                  defaultChecked
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm font-medium">Chasis</p>
                </div>
              </Label>

              <Label className="flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                  id="toggle-3"
                  defaultChecked
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm font-medium">Montajes y apoyos</p>
                </div>
              </Label>

              <Label className="flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                  id="toggle-3"
                  defaultChecked
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm font-medium">Frenos</p>
                </div>
              </Label>

              <Label className="flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                  id="toggle-3"
                  defaultChecked
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm font-medium">Enchufe de red</p>
                </div>
              </Label>

              <Label className="flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                  id="toggle-3"
                  defaultChecked
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm font-medium">Amarres contra tirones</p>
                </div>
              </Label>
            </section>
          </DialogContent>
        </Dialog>
      </section>
    </TabsContent>
  );
};
