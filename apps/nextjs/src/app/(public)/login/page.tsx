"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { Key, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@stackk/ui";
import { Button } from "@stackk/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@stackk/ui/card";
import { Input } from "@stackk/ui/input";
import { Label } from "@stackk/ui/label";
import { Separator } from "@stackk/ui/separator";

import { authClient } from "~/auth/client";
import { RedirectionWrapper } from "./wrapper";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <section className="grid h-svh place-items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3">
            <form className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Button
                disabled={loading}
                className="gap-2"
                onClick={async () => {
                  if (!email) {
                    return;
                  }

                  await authClient.emailOtp.sendVerificationOtp(
                    {
                      email,
                      type: "sign-in",
                    },
                    {
                      onRequest: () => {
                        setLoading(true);
                      },
                      onResponse: () => {
                        setLoading(false);
                      },
                      onSuccess: () => {
                        toast.success("Verification code sent!");
                      },
                    },
                  );
                }}
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Send OTP"}
              </Button>
            </form>

            <Separator className="my-3" />

            <Button
              variant="secondary"
              disabled={loading}
              className="gap-2"
              onClick={async () => {
                await authClient.signIn.passkey({
                  email,
                  fetchOptions: {
                    onRequest: () => {
                      setLoading(true);
                    },
                    onResponse: () => {
                      setLoading(false);
                    },
                  },
                });
              }}
            >
              <Key size={16} />
              Sign-in with Passkey
            </Button>

            <Suspense>
              <div
                className={cn(
                  "flex w-full items-center gap-2",
                  "flex-col justify-between",
                )}
              >
                <RedirectionWrapper loading={loading} setLoading={setLoading} />
              </div>
            </Suspense>
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex w-full justify-center py-4">
            <p className="text-center text-xs text-neutral-500">
              built with{" "}
              <Link href="https://better-auth.com" className="underline" target="_blank">
                <span className="cursor-pointer dark:text-white/70">better-auth.</span>
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
