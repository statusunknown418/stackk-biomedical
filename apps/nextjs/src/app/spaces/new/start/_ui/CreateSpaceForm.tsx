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
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@stackk/ui/form";
import { Input } from "@stackk/ui/input";

import { authClient } from "~/auth/client";
import { NewSpaceSteps } from "../../utils";

const restrictedNames = [
  "stackk",
  "stackkbiomedical",
  "stackkmed",
  "stackkmed.com",
  "medstack",
  "new",
  "stackkstudios",
];

const orgSchema = z.object({
  name: z.string().min(1),
  logo: z.string().optional(),
  slug: z.string().min(1),
});

export const CreateSpaceForm = ({ generatedId }: { generatedId: string }) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(orgSchema),
    defaultValues: {
      name: "",
      logo: undefined,
      slug: "",
    },
  });

  const baseSlug = form.watch("slug");
  const sluggedName =
    slugify(baseSlug, { lower: true, strict: true }) + `-${generatedId}`;

  const onSubmit = form.handleSubmit((data) => {
    const name = data.name.trim();

    if (restrictedNames.includes(name)) {
      return toast.error("Este nombre no puede ser usado", {
        description: `Por favor, elige un nombre diferente para tu organización`,
      });
    }

    toast.promise(
      authClient.organization.create({
        ...data,
        slug: sluggedName,
      }),
      {
        loading: "Cargando...",
        success: async ({ data, error }) => {
          if (!data?.id || !data.slug) {
            return toast.error("Algo sucedió", {
              description: `No se pudo crear la organización - ${error?.message}`,
            });
          }

          await authClient.organization.setActive({
            organizationId: data.id,
            organizationSlug: data.slug,
          });
          router.push(`/spaces/new/${NewSpaceSteps.details}`);
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
                <FormLabel>Nombre de la organización</FormLabel>
                <Input {...field} />

                <FormDescription>
                  El nombre de tu centro médico sera visible en la aplicación
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="slug"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Siglas (Nombre corto)</FormLabel>
                <Input className="font-mono" {...field} />

                <FormDescription>
                  Será utilizado como url para identificar la organización.
                </FormDescription>

                {baseSlug && (
                  <div>
                    <FormDescription>
                      Generado como:{" "}
                      <span className="font-mono text-green-500">{sluggedName}</span>
                    </FormDescription>

                    <FormDescription className="flex pl-4">
                      * Nota: Los últimos 5 caracteres son un identificador único
                    </FormDescription>
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Logo del centro médico</FormLabel>

            <FormDescription>
              TODO: Under -{" "}
              https://linear.app/stackkstudios/issue/STK-137/fe-add-logo-uploader-with-uploadthing-createspaceform
            </FormDescription>
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
