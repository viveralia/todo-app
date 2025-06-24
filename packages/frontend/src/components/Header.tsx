import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Header({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        "flex flex-col items-center justify-center gap-1",
        className
      )}
      {...props}
    >
      <h1 className="text-3xl font-semibold">Todo List</h1>
      <p className="text-sm text-muted-foreground">
        Stay organized and productive
      </p>
    </header>
  );
}
