"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@stackk/ui/button";
import { CardContent, CardFooter } from "@stackk/ui/card";
import { Form, FormDescription, FormField, FormItem, FormLabel } from "@stackk/ui/form";
import { Input } from "@stackk/ui/input";
import { Label } from "@stackk/ui/label";

import { authClient } from "~/auth/client";
import { NewSpaceSteps } from "../../utils";

const orgSchema = z.object({
  name: z.string().min(1),
  logo: z.string().optional(),
});
export const CreateSpaceForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(orgSchema),
    defaultValues: {
      name: "",
      logo: undefined,
    },
  });

  const sluggedName = slugify(form.watch("name"), { lower: true, strict: true });

  const onSubmit = form.handleSubmit((data) => {
    toast.promise(
      authClient.organization.create({
        ...data,
        slug: sluggedName,
      }),
      {
        loading: "Cargando...",
        success: (data) => {
          router.push(`/spaces/${data.data?.slug}/${NewSpaceSteps.details}`);
          return "Organización creada";
        },
        error: "Error al crear tu organización",
      },
    );
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <CardContent className="grid gap-6">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del centro médico</FormLabel>
                <Input {...field} />

                <FormDescription>
                  El nombre de tu centro médico sera visible en la aplicación
                </FormDescription>
              </FormItem>
            )}
          />

          <FormItem>
            <Label>Url identificador de la organización</Label>
            <Input defaultValue={sluggedName} disabled />

            <p className="text-muted-foreground text-sm">
              El slug de tu negocio sera visible para todos
            </p>
          </FormItem>

          <FormItem>
            <FormLabel>Logo del centro médico</FormLabel>

            <FormDescription>TODO: Under </FormDescription>
          </FormItem>
        </CardContent>

        <CardFooter className="mt-6 justify-end">
          <Button disabled={!form.formState.isValid || form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Guardando..." : "Continuar"}{" "}
            <ArrowRightIcon />
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};
