"use client";

import { Suspense } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@stackk/ui/card";

import { RedirectionWrapper } from "./wrapper";

export default function SignIn() {
  return (
    <section className="grid h-svh place-items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <Suspense>
          <CardContent>
            <RedirectionWrapper />
          </CardContent>
        </Suspense>

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
