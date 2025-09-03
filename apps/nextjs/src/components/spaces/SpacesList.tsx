"use client";

import type { Organization } from "better-auth/plugins";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@stackk/ui/button";
import { Card, CardContent } from "@stackk/ui/card";

import { authClient } from "~/lib/auth/client";

export const SpacesList = ({ organizations }: { organizations: Organization[] }) => {
  const router = useRouter();
  const session = authClient.useSession();

  return (
    <ul className="grid gap-3">
      {organizations.map((organization) => (
        <button
          type="button"
          key={organization.id}
          className="group"
          onClick={async () => {
            await authClient.organization.setActive({
              organizationId: organization.id,
              fetchOptions: {
                onSuccess: ({ data }) => {
                  router.push(`/spaces/${data.slug}`);
                },
              },
            });
          }}
        >
          <Card className="group-hover:border-muted-foreground/60 group-hover:bg-muted/60">
            <CardContent className="flex items-center gap-3">
              {organization.logo && (
                <Image alt="logo" width={48} height={48} src={organization.logo} />
              )}

              <div className="space-y-1 text-left">
                <h3>{organization.name}</h3>

                <p className="text-muted-foreground text-sm">/{organization.slug}</p>
              </div>

              <ArrowRightIcon className="text-border group-hover:text-primary ml-auto size-5" />
            </CardContent>
          </Card>
        </button>
      ))}

      <Button asChild>
        <Link href="/spaces/new">Crear nuevo workspace</Link>
      </Button>
    </ul>
  );
};
