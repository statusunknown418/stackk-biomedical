import { LoaderPinwheel } from "lucide-react";

import { cn } from "../utils";

export const Spinner = (props: { className?: string }) => {
  return (
    <LoaderPinwheel className={cn("text-brand-primary animate-spin", props.className)} />
  );
};
