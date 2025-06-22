import type { HTMLAttributes } from "react";

import { Card, CardContent } from "./ui/card";

type CounterProps = {
  total: number;
  completed: number;
  remaining: number;
};

export function Counter({
  total,
  completed,
  remaining,
  className,
  ...props
}: CounterProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={className} {...props}>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <p>Total: {total}</p>
          <p>Completed: {completed}</p>
          <p>Remaining: {remaining}</p>
        </div>
      </CardContent>
    </Card>
  );
}
