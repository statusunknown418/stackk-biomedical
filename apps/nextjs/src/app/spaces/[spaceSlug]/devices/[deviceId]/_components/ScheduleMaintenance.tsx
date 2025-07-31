"use client";

import { useState } from "react";
import {
  CalendarDotIcon,
  Check,
  CheckFatIcon,
  QuestionIcon,
} from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  AlertTriangleIcon,
  ChevronsUpDown,
  MousePointerSquareDashedIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";

import type { RouterOutputs } from "@stackk/api";
import { cn } from "@stackk/ui";
import { Button } from "@stackk/ui/button";
import { Calendar } from "@stackk/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@stackk/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@stackk/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@stackk/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@stackk/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@stackk/ui/sheet";

import { useTRPC } from "~/trpc/react";

export const ScheduleMaintenanceDialog = ({
  data,
}: {
  data: RouterOutputs["equipments"]["queries"]["getDetails"];
}) => {
  // const params = useParams<{ deviceId: string; spaceSlug: string }>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const trpc = useTRPC();

  const { data: org } = useSuspenseQuery(trpc.auth.getMembers.queryOptions());
  const { members } = org;

  const form = useForm();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <CalendarDotIcon />
          Agendar mantenimiento
        </Button>
      </SheetTrigger>

      <Form {...form}>
        <SheetContent className="min-w-1/3">
          <SheetHeader>
            <SheetTitle className="max-w-[30ch] text-xl">
              Agendar mantenimiento para {data?.brand} - {data?.model}
            </SheetTitle>
            <SheetDescription>
              Aquí puedes programar el mantenimiento de tu dispositivo. Además, asignar
              quién debería realizarlo, StackkBiomedical enviará notificaciones cuando la
              fecha se acerque.
            </SheetDescription>
          </SheetHeader>

          <form className="grid gap-5 px-4">
            <FormField
              name=""
              render={() => (
                <FormItem>
                  <FormLabel>Tipo de mantenimiento</FormLabel>

                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipos</SelectLabel>
                          <SelectItem value="preventivo">
                            <MousePointerSquareDashedIcon />
                            Preventivo
                          </SelectItem>
                          <SelectItem value="correctivo">
                            <AlertTriangleIcon />
                            Correctivo
                          </SelectItem>
                          <SelectItem value="otro">
                            <QuestionIcon />
                            Otro
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name=""
              render={() => (
                <FormItem>
                  <FormLabel>Fecha de mantenimiento</FormLabel>

                  <Calendar
                    mode="single"
                    className="w-full rounded-lg border"
                    disabled={{ before: new Date() }}
                  />

                  <FormDescription>
                    Selecciona la fecha en la que deseas programar el mantenimiento.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name=""
              render={() => (
                <FormItem>
                  <FormLabel>Asignar a</FormLabel>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between"
                      >
                        {value
                          ? members.find((member) => member.userId === value)?.user.name
                          : "Seleccionar usuario..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Buscar usuario..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {members.map((member) => (
                              <CommandItem
                                value={member.userId}
                                key={member.userId}
                                onSelect={(currentValue) => {
                                  setValue(currentValue === value ? "" : currentValue);
                                  setOpen(false);
                                }}
                              >
                                {member.user.name}

                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === member.userId ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormDescription>
                    Puedes designar a un miembro de tu organización para que se encargue
                    del mantenimiento programado.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <SheetFooter>
            <Button type="submit">
              <CheckFatIcon />
              Listo
            </Button>
            <Button variant="outline">Cancelar</Button>
          </SheetFooter>
        </SheetContent>
      </Form>
    </Sheet>
  );
};
