"use client";

import { Fragment } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";

import { Button } from "@stackk/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@stackk/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@stackk/ui/form";
import { Input } from "@stackk/ui/input";
import { TabsContent } from "@stackk/ui/tabs";

import { authClient } from "~/lib/auth/client";
import { useTRPC } from "~/lib/trpc/react";

const InvitePeopleSchema = z.object({
  email: z.string(),
});

export const TeamInvites = () => {
  const trpc = useTRPC();
  const { data: teams } = useSuspenseQuery(trpc.spaces.listTeams.queryOptions());

  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(InvitePeopleSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    authClient.organization.inviteMember({
      email: data.email,
      role: "member",
      fetchOptions: {
        onSuccess: () => {
          toast.success("Invitacion enviada");
        },
      },
    });
  });

  return (
    <Fragment>
      {teams.map((team) => (
        <TabsContent key={team.id} value={team.id}>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <Card key={team.id}>
                <CardHeader>
                  <CardTitle className="font-medium">{team.name}</CardTitle>
                  <CardDescription>Equipo de {team.name}</CardDescription>
                </CardHeader>

                <CardContent>
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                </CardContent>

                <CardFooter>
                  <Button>Invitar</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>
      ))}
    </Fragment>
  );
};
