import type { HTMLAttributes } from "react";

import { Card, CardContent } from "./ui/card";

type EmptyListProps = {
  className?: string;
  props?: HTMLAttributes<HTMLDivElement>;
};

export function EmptyList({ className, ...props }: EmptyListProps) {
  return (
    <Card className={className} {...props}>
      <CardContent>
        <p className="text-center text-muted-foreground">
          No todos yet. Add one above!
        </p>
      </CardContent>
    </Card>
  );
}
