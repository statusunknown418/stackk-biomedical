"use client";

import Link from "next/link";
import { FileTextIcon, PlusIcon } from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@stackk/ui/button";
import { CardAction, CardDescription, CardHeader, CardTitle } from "@stackk/ui/card";
import { TabsContent } from "@stackk/ui/tabs";

import { useTRPC } from "~/lib/trpc/react";

export const DocumentsTab = ({ deviceId }: { deviceId: string }) => {
  const trpc = useTRPC();

  const { data: documents } = useSuspenseQuery(
    trpc.equipments.queries.getDocuments.queryOptions(deviceId),
  );

  return (
    <TabsContent value="docs" className="grid grid-cols-1 gap-8">
      <CardHeader className="py-5">
        <CardAction>
          <Button variant="outline">
            <PlusIcon />
            Agregar documento
          </Button>
        </CardAction>

        <CardTitle>Documentos</CardTitle>
        <CardDescription>Documentos relacionados con el dispositivo.</CardDescription>
      </CardHeader>

      {!documents.length && (
        <article className="text-muted-foreground flex min-h-20 items-center justify-center border p-2">
          No hay documentos disponibles.
        </article>
      )}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {documents.map((document) => (
          <Link
            href={document.url}
            key={document.id}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card hover:border-muted flex items-center gap-2 rounded-lg border p-4"
          >
            <FileTextIcon className="text-muted-foreground size-6" />

            <p>{document.name ?? "Documento sin nombre"}</p>
          </Link>
        ))}
      </section>
    </TabsContent>
  );
};
