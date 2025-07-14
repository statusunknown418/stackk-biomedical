import { redirect } from "next/navigation";
import { BuildingsIcon } from "@phosphor-icons/react/dist/ssr";

import { Card, CardDescription, CardHeader, CardTitle } from "@stackk/ui/card";
import { Progress } from "@stackk/ui/progress";
import { Separator } from "@stackk/ui/separator";

import { SignOut } from "~/app/_ui/SignOut";
import { getSession } from "~/auth/server";
import { CreateSpaceForm } from "./_ui/CreateSpaceForm";

export default async function NewSpacePage() {
  const session = await getSession();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <section className="grid h-full place-items-center">
      <article className="grid w-full max-w-2xl gap-4">
        <h1 className="text-muted-foreground text-4xl/5">
          Bienvenido a{" "}
          <span className="text-foreground font-medium">StackkBiomedical</span>
        </h1>

        <div className="mt-10 mb-4">
          <p className="text-muted-foreground text-sm">Paso 1 de 3</p>
          <Progress value={33} className="mt-1" />
        </div>

        <Card>
          <CardHeader>
            <BuildingsIcon className="text-brand-primary size-10" weight="duotone" />
            <CardTitle className="text-xl">Preparemos tu organización</CardTitle>
            <CardDescription>Solo debes completar estos simples pasos</CardDescription>
          </CardHeader>

          <Separator />

          <CreateSpaceForm />
        </Card>

        <div className="mt-8 flex flex-col items-start gap-2 text-sm">
          <span className="text-muted-foreground">
            Puedes terminar el proceso más tarde, pero recuerda que si no creas una
            organización no podrás acceder a StackkBiomedical
          </span>
          <SignOut variant="link" className="text-foreground" />
        </div>
      </article>
    </section>
  );
}
