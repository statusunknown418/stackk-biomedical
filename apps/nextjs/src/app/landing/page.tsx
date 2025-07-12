import { Suspense } from "react";

import { Button } from "@stackk/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@stackk/ui/card";

import { env } from "~/env";
import { AuthShowcase } from "../_ui/auth-showcase";
import { SignOut } from "../_ui/SignOut";

// import { CreatePostForm, PostCardSkeleton, PostList } from "./_components/posts";

export default function HomePage() {
  // prefetch(trpc.post.all.queryOptions());

  return (
    <main className="h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl tracking-tight sm:text-[5rem]">Stackk Biomedical</h1>
        <p>FHIR & HL7 compliant biomedical data platform + inventory management</p>

        <Suspense>
          <AuthShowcase />
        </Suspense>

        <SignOut />

        {env.AUTH_GOOGLE_ID}
        <div>{env.AUTH_GOOGLE_SECRET}</div>

        <Button>Something</Button>

        {/* 
          <CreatePostForm />
          <div className="w-full max-w-2xl overflow-y-scroll">
            <Suspense
              fallback={
                <div className="flex w-full flex-col gap-4">
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                </div>
              }
            >
              <PostList />
            </Suspense>
          </div> */}

        <Card>
          <CardHeader>
            <CardTitle>Another thing</CardTitle>
          </CardHeader>

          <CardContent>Something here</CardContent>

          <CardFooter>
            <Button variant="outline">Click me</Button>
            <Button variant="secondary">Click me</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
