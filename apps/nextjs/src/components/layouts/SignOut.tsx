"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { SignOutIcon } from "@phosphor-icons/react";

import type { ButtonVariants } from "@stackk/ui/button";
import { Button } from "@stackk/ui/button";
import { Spinner } from "@stackk/ui/spinner";

import { authClient } from "~/lib/auth/client";

export const SignOut = (props: { variant?: ButtonVariants; className?: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      variant={props.variant ?? "outline"}
      className={props.className}
      onClick={async () => {
        try {
          setIsLoading(true);

          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                redirect("/");
              },
            },
          });
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <SignOutIcon className="text-destructive" />
      Cerrar sesión
      {isLoading && <Spinner />}
    </Button>
  );
};
